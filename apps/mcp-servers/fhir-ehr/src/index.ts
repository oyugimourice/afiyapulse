#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { fhirDatabase } from './database.js';
import {
  GetPatientParamsSchema,
  GetPatientHistoryParamsSchema,
  GetObservationsParamsSchema,
  GetConditionsParamsSchema,
  GetMedicationHistoryParamsSchema,
  GetEncountersParamsSchema,
} from './types.js';

/**
 * FHIR EHR MCP Server
 * Provides access to patient health records via FHIR-compatible interface
 */
class FHIREHRServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'fhir-ehr-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: this.getTools(),
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'get_patient':
            return await this.handleGetPatient(args);
          case 'get_patient_history':
            return await this.handleGetPatientHistory(args);
          case 'get_observations':
            return await this.handleGetObservations(args);
          case 'get_conditions':
            return await this.handleGetConditions(args);
          case 'get_medication_history':
            return await this.handleGetMedicationHistory(args);
          case 'get_encounters':
            return await this.handleGetEncounters(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  private getTools(): Tool[] {
    return [
      {
        name: 'get_patient',
        description: 'Retrieve patient demographic information by patient ID',
        inputSchema: {
          type: 'object',
          properties: {
            patientId: {
              type: 'string',
              description: 'The unique identifier for the patient',
            },
          },
          required: ['patientId'],
        },
      },
      {
        name: 'get_patient_history',
        description: 'Retrieve comprehensive patient history including conditions, medications, encounters, observations, and procedures',
        inputSchema: {
          type: 'object',
          properties: {
            patientId: {
              type: 'string',
              description: 'The unique identifier for the patient',
            },
            includeInactive: {
              type: 'boolean',
              description: 'Whether to include inactive conditions and medications',
              default: false,
            },
            limit: {
              type: 'number',
              description: 'Maximum number of recent encounters and observations to return',
              default: 10,
            },
          },
          required: ['patientId'],
        },
      },
      {
        name: 'get_observations',
        description: 'Retrieve patient observations (lab results, vitals, imaging)',
        inputSchema: {
          type: 'object',
          properties: {
            patientId: {
              type: 'string',
              description: 'The unique identifier for the patient',
            },
            type: {
              type: 'string',
              enum: ['LAB', 'VITAL', 'IMAGING'],
              description: 'Filter by observation type',
            },
            fromDate: {
              type: 'string',
              description: 'ISO date string to filter observations from this date onwards',
            },
            limit: {
              type: 'number',
              description: 'Maximum number of observations to return',
              default: 20,
            },
          },
          required: ['patientId'],
        },
      },
      {
        name: 'get_conditions',
        description: 'Retrieve patient conditions (diagnoses, problems)',
        inputSchema: {
          type: 'object',
          properties: {
            patientId: {
              type: 'string',
              description: 'The unique identifier for the patient',
            },
            clinicalStatus: {
              type: 'string',
              enum: ['active', 'recurrence', 'relapse', 'inactive', 'remission', 'resolved'],
              description: 'Filter by clinical status',
            },
            limit: {
              type: 'number',
              description: 'Maximum number of conditions to return',
              default: 20,
            },
          },
          required: ['patientId'],
        },
      },
      {
        name: 'get_medication_history',
        description: 'Retrieve patient medication history',
        inputSchema: {
          type: 'object',
          properties: {
            patientId: {
              type: 'string',
              description: 'The unique identifier for the patient',
            },
            status: {
              type: 'string',
              enum: ['active', 'completed', 'entered-in-error', 'intended', 'stopped', 'on-hold'],
              description: 'Filter by medication status',
            },
            limit: {
              type: 'number',
              description: 'Maximum number of medications to return',
              default: 20,
            },
          },
          required: ['patientId'],
        },
      },
      {
        name: 'get_encounters',
        description: 'Retrieve patient encounter history (consultations, visits)',
        inputSchema: {
          type: 'object',
          properties: {
            patientId: {
              type: 'string',
              description: 'The unique identifier for the patient',
            },
            fromDate: {
              type: 'string',
              description: 'ISO date string to filter encounters from this date onwards',
            },
            limit: {
              type: 'number',
              description: 'Maximum number of encounters to return',
              default: 10,
            },
          },
          required: ['patientId'],
        },
      },
    ];
  }

  private async handleGetPatient(args: unknown) {
    const params = GetPatientParamsSchema.parse(args);
    const patient = fhirDatabase.getPatient(params.patientId);

    if (!patient) {
      throw new Error(`Patient not found: ${params.patientId}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(patient, null, 2),
        },
      ],
    };
  }

  private async handleGetPatientHistory(args: unknown) {
    const params = GetPatientHistoryParamsSchema.parse(args);
    const history = fhirDatabase.getPatientHistory(
      params.patientId,
      params.includeInactive,
      params.limit
    );

    if (!history) {
      throw new Error(`Patient not found: ${params.patientId}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(history, null, 2),
        },
      ],
    };
  }

  private async handleGetObservations(args: unknown) {
    const params = GetObservationsParamsSchema.parse(args);
    const observations = fhirDatabase.getObservations(
      params.patientId,
      params.type,
      params.fromDate,
      params.limit
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(observations, null, 2),
        },
      ],
    };
  }

  private async handleGetConditions(args: unknown) {
    const params = GetConditionsParamsSchema.parse(args);
    const conditions = fhirDatabase.getConditions(
      params.patientId,
      params.clinicalStatus,
      params.limit
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(conditions, null, 2),
        },
      ],
    };
  }

  private async handleGetMedicationHistory(args: unknown) {
    const params = GetMedicationHistoryParamsSchema.parse(args);
    const medications = fhirDatabase.getMedicationHistory(
      params.patientId,
      params.status,
      params.limit
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(medications, null, 2),
        },
      ],
    };
  }

  private async handleGetEncounters(args: unknown) {
    const params = GetEncountersParamsSchema.parse(args);
    const encounters = fhirDatabase.getEncounters(
      params.patientId,
      params.fromDate,
      params.limit
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(encounters, null, 2),
        },
      ],
    };
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('FHIR EHR MCP Server running on stdio');
  }
}

// Start the server
const server = new FHIREHRServer();
server.run().catch(console.error);

// Made with Bob