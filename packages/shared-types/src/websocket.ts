import { AgentState, AgentMessage } from './agents';
import { TranscriptSegment, ConsultationDocuments } from './consultation';

export enum WebSocketEventType {
  // Connection events
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  ERROR = 'error',

  // Consultation events
  CONSULTATION_START = 'consultation:start',
  CONSULTATION_STOP = 'consultation:stop',
  CONSULTATION_PAUSE = 'consultation:pause',
  CONSULTATION_RESUME = 'consultation:resume',

  // Transcript events
  TRANSCRIPT_UPDATE = 'transcript:update',
  TRANSCRIPT_INTERIM = 'transcript:interim',
  TRANSCRIPT_FINAL = 'transcript:final',

  // Agent events
  AGENT_STATUS = 'agent:status',
  AGENT_MESSAGE = 'agent:message',
  AGENT_ERROR = 'agent:error',

  // Document events
  DOCUMENT_GENERATED = 'document:generated',
  DOCUMENT_UPDATED = 'document:updated',
  DOCUMENT_APPROVED = 'document:approved',
  DOCUMENT_REJECTED = 'document:rejected',
}

export interface WebSocketEvent<T = any> {
  type: WebSocketEventType;
  data: T;
  timestamp: Date;
}

export interface ConsultationStartEvent {
  consultationId: string;
  patientId: string;
  doctorId: string;
}

export interface ConsultationStopEvent {
  consultationId: string;
  duration: number;
}

export interface TranscriptUpdateEvent {
  consultationId: string;
  segment: TranscriptSegment;
  isInterim: boolean;
}

export interface AgentStatusEvent {
  consultationId: string;
  agents: AgentState[];
}

export interface AgentMessageEvent {
  consultationId: string;
  message: AgentMessage;
}

export interface DocumentGeneratedEvent {
  consultationId: string;
  documentType: 'SOAP_NOTE' | 'PRESCRIPTION' | 'REFERRAL' | 'APPOINTMENT';
  documentId: string;
  data: any;
}

export interface DocumentUpdatedEvent {
  consultationId: string;
  documentType: 'SOAP_NOTE' | 'PRESCRIPTION' | 'REFERRAL' | 'APPOINTMENT';
  documentId: string;
  data: any;
}

export interface DocumentApprovedEvent {
  consultationId: string;
  documentType: 'SOAP_NOTE' | 'PRESCRIPTION' | 'REFERRAL' | 'APPOINTMENT';
  documentId: string;
  approvedBy: string;
  approvedAt: Date;
}

export interface WebSocketClientConfig {
  url: string;
  reconnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

export interface WebSocketServerConfig {
  port: number;
  cors?: {
    origin: string | string[];
    credentials?: boolean;
  };
}

// Made with Bob
