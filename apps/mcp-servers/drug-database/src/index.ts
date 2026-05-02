#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { drugDatabase } from './database.js';
import {
  DrugSearchParamsSchema,
  InteractionCheckParamsSchema,
  DosageValidationParamsSchema,
} from './types.js';

/**
 * Drug Database MCP Server
 * Provides drug information, interaction checking, and dosage validation
 */
class DrugDatabaseServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'drug-database-server',
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
          case 'search_drugs':
            return await this.searchDrugs(args);
          case 'get_drug_info':
            return await this.getDrugInfo(args);
          case 'check_interactions':
            return await this.checkInteractions(args);
          case 'validate_dosage':
            return await this.validateDosage(args);
          case 'get_categories':
            return await this.getCategories();
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
        name: 'search_drugs',
        description: 'Search for drugs by name or category. Returns a list of matching drugs with basic information.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query (drug name, generic name, or brand name)',
            },
            category: {
              type: 'string',
              description: 'Filter by drug category (optional)',
            },
            limit: {
              type: 'number',
              description: 'Maximum number of results (default: 10)',
              default: 10,
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'get_drug_info',
        description: 'Get detailed information about a specific drug including indications, contraindications, side effects, and dosage information.',
        inputSchema: {
          type: 'object',
          properties: {
            drugId: {
              type: 'string',
              description: 'Drug identifier (usually the generic name in lowercase)',
            },
          },
          required: ['drugId'],
        },
      },
      {
        name: 'check_interactions',
        description: 'Check for drug-drug interactions between multiple medications. Returns severity level and clinical management recommendations.',
        inputSchema: {
          type: 'object',
          properties: {
            drugs: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Array of drug IDs to check for interactions (minimum 2)',
              minItems: 2,
            },
          },
          required: ['drugs'],
        },
      },
      {
        name: 'validate_dosage',
        description: 'Validate if a proposed dosage is within recommended ranges for a specific drug, considering patient age and other factors.',
        inputSchema: {
          type: 'object',
          properties: {
            drugId: {
              type: 'string',
              description: 'Drug identifier',
            },
            dose: {
              type: 'number',
              description: 'Proposed dose amount',
            },
            unit: {
              type: 'string',
              description: 'Dose unit (e.g., mg, mg/kg/day)',
            },
            frequency: {
              type: 'string',
              description: 'Dosing frequency',
            },
            patientAge: {
              type: 'number',
              description: 'Patient age in years',
            },
            patientWeight: {
              type: 'number',
              description: 'Patient weight in kg (optional)',
            },
            indication: {
              type: 'string',
              description: 'Indication for use (optional)',
            },
          },
          required: ['drugId', 'dose', 'unit', 'frequency', 'patientAge'],
        },
      },
      {
        name: 'get_categories',
        description: 'Get a list of all available drug categories in the database.',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ];
  }

  private async searchDrugs(args: any) {
    const params = DrugSearchParamsSchema.parse(args);
    const results = drugDatabase.searchDrugs(
      params.query,
      params.category,
      params.limit
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              query: params.query,
              category: params.category,
              count: results.length,
              drugs: results.map(drug => ({
                id: drug.id,
                name: drug.name,
                genericName: drug.genericName,
                category: drug.category,
                description: drug.description,
              })),
            },
            null,
            2
          ),
        },
      ],
    };
  }

  private async getDrugInfo(args: any) {
    const { drugId } = args;
    const drug = drugDatabase.getDrug(drugId);

    if (!drug) {
      throw new Error(`Drug not found: ${drugId}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(drug, null, 2),
        },
      ],
    };
  }

  private async checkInteractions(args: any) {
    const params = InteractionCheckParamsSchema.parse(args);
    const interactions = drugDatabase.checkInteractions(params.drugs);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              drugs: params.drugs,
              interactionCount: interactions.length,
              interactions: interactions.map(interaction => ({
                drug1: interaction.drug1,
                drug2: interaction.drug2,
                severity: interaction.severity,
                description: interaction.description,
                clinicalEffects: interaction.clinicalEffects,
                management: interaction.management,
              })),
              summary:
                interactions.length === 0
                  ? 'No known interactions found'
                  : `Found ${interactions.length} interaction(s). Highest severity: ${this.getHighestSeverity(interactions)}`,
            },
            null,
            2
          ),
        },
      ],
    };
  }

  private async validateDosage(args: any) {
    const params = DosageValidationParamsSchema.parse(args);
    const validation = drugDatabase.validateDosage(
      params.drugId,
      params.dose,
      params.unit,
      params.patientAge
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              drugId: params.drugId,
              proposedDose: `${params.dose}${params.unit}`,
              frequency: params.frequency,
              patientAge: params.patientAge,
              validation: {
                valid: validation.valid,
                message: validation.message,
                recommendations: validation.recommendations,
              },
            },
            null,
            2
          ),
        },
      ],
    };
  }

  private async getCategories() {
    const categories = drugDatabase.getCategories();

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              count: categories.length,
              categories,
            },
            null,
            2
          ),
        },
      ],
    };
  }

  private getHighestSeverity(interactions: any[]): string {
    const severityOrder = ['contraindicated', 'major', 'moderate', 'minor'];
    for (const severity of severityOrder) {
      if (interactions.some(i => i.severity === severity)) {
        return severity;
      }
    }
    return 'unknown';
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Drug Database MCP Server running on stdio');
  }
}

// Start the server
const server = new DrugDatabaseServer();
server.run().catch(console.error);

// Made with Bob
