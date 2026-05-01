export enum AgentType {
  SUPERVISOR = 'SUPERVISOR',
  SCRIBE = 'SCRIBE',
  PRESCRIPTION = 'PRESCRIPTION',
  REFERRAL = 'REFERRAL',
  FOLLOWUP = 'FOLLOWUP',
}

export enum AgentStatus {
  IDLE = 'IDLE',
  LISTENING = 'LISTENING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

export interface AgentMessage {
  type: 'START' | 'PROGRESS' | 'COMPLETE' | 'ERROR';
  agentId: string;
  agentType: AgentType;
  consultationId: string;
  data: any;
  timestamp: Date;
  error?: string;
}

export interface AgentState {
  agentId: string;
  agentType: AgentType;
  status: AgentStatus;
  progress: number;
  lastUpdate: Date;
  error?: string;
}

export interface SupervisorAgentConfig {
  consultationId: string;
  patientId: string;
  doctorId: string;
  enabledAgents: AgentType[];
}

export interface ScribeAgentResult {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  confidence: number;
}

export interface PrescriptionAgentResult {
  medications: MedicationItem[];
  instructions?: string;
  warnings: string[];
  interactions: DrugInteraction[];
}

export interface MedicationItem {
  drugName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
  interactions: string[];
}

export interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: 'MINOR' | 'MODERATE' | 'MAJOR';
  description: string;
}

export interface ReferralAgentResult {
  specialty: string;
  reason: string;
  urgency: 'ROUTINE' | 'URGENT' | 'EMERGENCY';
  notes?: string;
  patientHistory: string;
}

export interface FollowupAgentResult {
  scheduledAt: Date;
  type: 'FOLLOW_UP' | 'LAB_WORK' | 'IMAGING' | 'SPECIALIST' | 'PROCEDURE';
  reason?: string;
  instructions?: string;
}

// Made with Bob
