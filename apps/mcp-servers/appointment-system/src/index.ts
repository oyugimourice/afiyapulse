#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { appointmentDatabase } from './database.js';
import {
  CheckAvailabilityParamsSchema,
  BookAppointmentParamsSchema,
  GetAppointmentParamsSchema,
  GetPatientAppointmentsParamsSchema,
  CancelAppointmentParamsSchema,
  RescheduleAppointmentParamsSchema,
} from './types.js';

/**
 * Appointment System MCP Server
 * Provides appointment scheduling, availability checking, and calendar management
 */
class AppointmentSystemServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'appointment-system-server',
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
          case 'check_availability':
            return await this.handleCheckAvailability(args);
          case 'book_appointment':
            return await this.handleBookAppointment(args);
          case 'get_appointment':
            return await this.handleGetAppointment(args);
          case 'get_patient_appointments':
            return await this.handleGetPatientAppointments(args);
          case 'cancel_appointment':
            return await this.handleCancelAppointment(args);
          case 'reschedule_appointment':
            return await this.handleRescheduleAppointment(args);
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
        name: 'check_availability',
        description: 'Check doctor availability for a specific date. Returns available time slots.',
        inputSchema: {
          type: 'object',
          properties: {
            date: {
              type: 'string',
              description: 'ISO date string for the desired appointment date',
            },
            doctorId: {
              type: 'string',
              description: 'Optional: Specific doctor ID to check availability for',
            },
            specialty: {
              type: 'string',
              description: 'Optional: Filter by doctor specialty (e.g., "Cardiology", "Pediatrics")',
            },
            duration: {
              type: 'number',
              description: 'Appointment duration in minutes (default: 30)',
              default: 30,
            },
          },
          required: ['date'],
        },
      },
      {
        name: 'book_appointment',
        description: 'Book a new appointment for a patient',
        inputSchema: {
          type: 'object',
          properties: {
            patientId: {
              type: 'string',
              description: 'Patient ID',
            },
            patientName: {
              type: 'string',
              description: 'Patient full name',
            },
            doctorId: {
              type: 'string',
              description: 'Doctor ID',
            },
            scheduledAt: {
              type: 'string',
              description: 'ISO datetime string for the appointment',
            },
            type: {
              type: 'string',
              enum: ['FOLLOW_UP', 'LAB_WORK', 'IMAGING', 'SPECIALIST', 'PROCEDURE'],
              description: 'Type of appointment',
            },
            duration: {
              type: 'number',
              description: 'Appointment duration in minutes (default: 30)',
              default: 30,
            },
            reason: {
              type: 'string',
              description: 'Reason for appointment',
            },
            notes: {
              type: 'string',
              description: 'Additional notes',
            },
          },
          required: ['patientId', 'patientName', 'doctorId', 'scheduledAt', 'type'],
        },
      },
      {
        name: 'get_appointment',
        description: 'Get details of a specific appointment',
        inputSchema: {
          type: 'object',
          properties: {
            appointmentId: {
              type: 'string',
              description: 'Appointment ID',
            },
          },
          required: ['appointmentId'],
        },
      },
      {
        name: 'get_patient_appointments',
        description: 'Get all appointments for a patient',
        inputSchema: {
          type: 'object',
          properties: {
            patientId: {
              type: 'string',
              description: 'Patient ID',
            },
            status: {
              type: 'string',
              enum: ['scheduled', 'confirmed', 'cancelled', 'completed', 'no-show'],
              description: 'Filter by appointment status',
            },
            fromDate: {
              type: 'string',
              description: 'ISO date string to filter appointments from this date onwards',
            },
            limit: {
              type: 'number',
              description: 'Maximum number of appointments to return (default: 10)',
              default: 10,
            },
          },
          required: ['patientId'],
        },
      },
      {
        name: 'cancel_appointment',
        description: 'Cancel an existing appointment',
        inputSchema: {
          type: 'object',
          properties: {
            appointmentId: {
              type: 'string',
              description: 'Appointment ID',
            },
            reason: {
              type: 'string',
              description: 'Reason for cancellation',
            },
          },
          required: ['appointmentId'],
        },
      },
      {
        name: 'reschedule_appointment',
        description: 'Reschedule an existing appointment to a new time',
        inputSchema: {
          type: 'object',
          properties: {
            appointmentId: {
              type: 'string',
              description: 'Appointment ID',
            },
            newScheduledAt: {
              type: 'string',
              description: 'New ISO datetime string for the appointment',
            },
            reason: {
              type: 'string',
              description: 'Reason for rescheduling',
            },
          },
          required: ['appointmentId', 'newScheduledAt'],
        },
      },
    ];
  }

  private async handleCheckAvailability(args: unknown) {
    const params = CheckAvailabilityParamsSchema.parse(args);
    const availability = appointmentDatabase.checkAvailability(
      params.date,
      params.doctorId,
      params.specialty,
      params.duration
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(availability, null, 2),
        },
      ],
    };
  }

  private async handleBookAppointment(args: unknown) {
    const params = BookAppointmentParamsSchema.parse(args);
    const appointment = appointmentDatabase.bookAppointment(params);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(appointment, null, 2),
        },
      ],
    };
  }

  private async handleGetAppointment(args: unknown) {
    const params = GetAppointmentParamsSchema.parse(args);
    const appointment = appointmentDatabase.getAppointment(params.appointmentId);

    if (!appointment) {
      throw new Error(`Appointment not found: ${params.appointmentId}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(appointment, null, 2),
        },
      ],
    };
  }

  private async handleGetPatientAppointments(args: unknown) {
    const params = GetPatientAppointmentsParamsSchema.parse(args);
    const appointments = appointmentDatabase.getPatientAppointments(
      params.patientId,
      params.status,
      params.fromDate,
      params.limit
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(appointments, null, 2),
        },
      ],
    };
  }

  private async handleCancelAppointment(args: unknown) {
    const params = CancelAppointmentParamsSchema.parse(args);
    const appointment = appointmentDatabase.cancelAppointment(
      params.appointmentId,
      params.reason
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(appointment, null, 2),
        },
      ],
    };
  }

  private async handleRescheduleAppointment(args: unknown) {
    const params = RescheduleAppointmentParamsSchema.parse(args);
    const appointment = appointmentDatabase.rescheduleAppointment(
      params.appointmentId,
      params.newScheduledAt,
      params.reason
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(appointment, null, 2),
        },
      ],
    };
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Appointment System MCP Server running on stdio');
  }
}

// Start the server
const server = new AppointmentSystemServer();
server.run().catch(console.error);

// Made with Bob