import { EventEmitter } from 'events';
import { AgentContext } from './base.agent';
import clinicalScribeAgent from './clinical-scribe.agent';
import logger from '../config/logger';
import { prisma } from '@afiyapulse/database';

export interface SupervisorConfig {
  consultationId: string;
  patientId: string;
  doctorId: string;
}

export class SupervisorAgent extends EventEmitter {
  private consultationId: string;
  private patientId: string;
  private doctorId: string;
  private isRunning: boolean = false;

  constructor(config: SupervisorConfig) {
    super();
    this.consultationId = config.consultationId;
    this.patientId = config.patientId;
    this.doctorId = config.doctorId;
  }

  /**
   * Start the supervisor agent orchestration
   */
  async start(): Promise<void> {
    if (this.isRunning) {
      logger.warn(`Supervisor already running for consultation ${this.consultationId}`);
      return;
    }

    this.isRunning = true;
    logger.info(`Supervisor started for consultation ${this.consultationId}`);

    try {
      // Get consultation transcripts
      const transcripts = await this.getTranscripts();

      if (transcripts.length === 0) {
        logger.warn(`No transcripts found for consultation ${this.consultationId}`);
        return;
      }

      // Create agent context
      const context: AgentContext = {
        consultationId: this.consultationId,
        patientId: this.patientId,
        doctorId: this.doctorId,
        transcripts: transcripts.map((t) => ({
          text: t.text,
          speaker: t.speaker,
          timestamp: t.timestamp,
        })),
      };

      // Orchestrate agents in parallel
      await this.orchestrateAgents(context);

      this.emit('completed', {
        consultationId: this.consultationId,
        timestamp: new Date(),
      });

      logger.info(`Supervisor completed for consultation ${this.consultationId}`);
    } catch (error) {
      logger.error(`Supervisor error for consultation ${this.consultationId}:`, error);
      this.emit('error', {
        consultationId: this.consultationId,
        error: (error as Error).message,
        timestamp: new Date(),
      });
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Orchestrate all specialized agents
   */
  private async orchestrateAgents(context: AgentContext): Promise<void> {
    // Set up event listeners for all agents
    this.setupAgentListeners();

    // Run agents in parallel
    const agentPromises = [
      this.runClinicalScribe(context),
      // Add more agents here as they are implemented
      // this.runPrescriptionDrafter(context),
      // this.runReferralWriter(context),
      // this.runFollowUpScheduler(context),
    ];

    // Wait for all agents to complete
    const results = await Promise.allSettled(agentPromises);

    // Log results
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        logger.error(`Agent ${index} failed:`, result.reason);
      }
    });
  }

  /**
   * Run Clinical Scribe Agent
   */
  private async runClinicalScribe(context: AgentContext): Promise<void> {
    try {
      logger.info('Starting Clinical Scribe Agent');
      const soapNote = await clinicalScribeAgent.process(context);
      
      this.emit('agent_completed', {
        agent: 'scribe',
        consultationId: this.consultationId,
        result: soapNote,
        timestamp: new Date(),
      });
    } catch (error) {
      logger.error('Clinical Scribe Agent failed:', error);
      throw error;
    }
  }

  /**
   * Set up event listeners for all agents
   */
  private setupAgentListeners(): void {
    // Clinical Scribe Agent listeners
    clinicalScribeAgent.on('status', (status) => {
      this.emit('agent_status', {
        consultationId: this.consultationId,
        ...status,
      });
    });

    clinicalScribeAgent.on('message', (message) => {
      this.emit('agent_message', {
        consultationId: this.consultationId,
        ...message,
      });
    });

    clinicalScribeAgent.on('error', (error) => {
      this.emit('agent_error', {
        consultationId: this.consultationId,
        ...error,
      });
    });
  }

  /**
   * Get consultation transcripts
   */
  private async getTranscripts() {
    return await prisma.transcript.findMany({
      where: { consultationId: this.consultationId },
      orderBy: { timestamp: 'asc' },
    });
  }

  /**
   * Stop the supervisor
   */
  async stop(): Promise<void> {
    this.isRunning = false;
    this.removeAllListeners();
    
    // Clean up agent listeners
    clinicalScribeAgent.removeAllListeners();

    logger.info(`Supervisor stopped for consultation ${this.consultationId}`);
  }

  /**
   * Get supervisor status
   */
  getStatus() {
    return {
      consultationId: this.consultationId,
      isRunning: this.isRunning,
      agents: {
        scribe: clinicalScribeAgent.getInfo(),
        // Add more agents here
      },
    };
  }

  /**
   * Trigger specific agent manually
   */
  async triggerAgent(agentType: string, context: AgentContext): Promise<any> {
    switch (agentType) {
      case 'scribe':
        return await clinicalScribeAgent.process(context);
      // Add more agents here
      default:
        throw new Error(`Unknown agent type: ${agentType}`);
    }
  }
}

/**
 * Supervisor Agent Service
 */
class SupervisorAgentService {
  private supervisors: Map<string, SupervisorAgent> = new Map();

  /**
   * Create and start a supervisor for a consultation
   */
  async startSupervisor(config: SupervisorConfig): Promise<SupervisorAgent> {
    // Check if supervisor already exists
    if (this.supervisors.has(config.consultationId)) {
      const existing = this.supervisors.get(config.consultationId)!;
      logger.warn(`Supervisor already exists for consultation ${config.consultationId}`);
      return existing;
    }

    // Create new supervisor
    const supervisor = new SupervisorAgent(config);
    this.supervisors.set(config.consultationId, supervisor);

    // Start supervisor
    await supervisor.start();

    // Clean up when completed
    supervisor.once('completed', () => {
      this.supervisors.delete(config.consultationId);
    });

    supervisor.once('error', () => {
      this.supervisors.delete(config.consultationId);
    });

    return supervisor;
  }

  /**
   * Get supervisor for a consultation
   */
  getSupervisor(consultationId: string): SupervisorAgent | undefined {
    return this.supervisors.get(consultationId);
  }

  /**
   * Stop supervisor for a consultation
   */
  async stopSupervisor(consultationId: string): Promise<void> {
    const supervisor = this.supervisors.get(consultationId);
    if (supervisor) {
      await supervisor.stop();
      this.supervisors.delete(consultationId);
    }
  }

  /**
   * Get all active supervisors
   */
  getActiveSupervisors(): string[] {
    return Array.from(this.supervisors.keys());
  }

  /**
   * Stop all supervisors
   */
  async stopAll(): Promise<void> {
    const promises = Array.from(this.supervisors.values()).map((s) => s.stop());
    await Promise.all(promises);
    this.supervisors.clear();
  }
}

export default new SupervisorAgentService();

// Made with Bob
