import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Spinner from '@/components/ui/Spinner';
import { useWebSocket } from '@/hooks/useWebSocket';

export interface AgentStatus {
  agentName: string;
  status: 'IDLE' | 'PROCESSING' | 'COMPLETED' | 'ERROR';
  progress?: number;
  message?: string;
  startTime?: Date;
  endTime?: Date;
  error?: string;
}

interface AgentStatusDisplayProps {
  consultationId: string;
}

export default function AgentStatusDisplay({ consultationId }: AgentStatusDisplayProps) {
  const { isConnected, subscribe } = useWebSocket('/consultation');
  const [agents, setAgents] = useState<AgentStatus[]>([
    {
      agentName: 'Clinical Scribe',
      status: 'IDLE',
      message: 'Waiting to process transcript',
    },
    {
      agentName: 'Prescription Drafter',
      status: 'IDLE',
      message: 'Waiting for SOAP note',
    },
    {
      agentName: 'Referral Writer',
      status: 'IDLE',
      message: 'Waiting for assessment',
    },
    {
      agentName: 'Follow-up Scheduler',
      status: 'IDLE',
      message: 'Waiting for treatment plan',
    },
  ]);

  useEffect(() => {
    if (!isConnected || !consultationId) return;

    const unsubscribe = subscribe('agent-status', (data: AgentStatus) => {
      setAgents((prev) =>
        prev.map((agent) =>
          agent.agentName === data.agentName ? { ...agent, ...data } : agent
        )
      );
    });

    return unsubscribe;
  }, [isConnected, consultationId, subscribe]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge variant="success">Completed</Badge>;
      case 'PROCESSING':
        return <Badge variant="warning">Processing</Badge>;
      case 'ERROR':
        return <Badge variant="danger">Error</Badge>;
      default:
        return <Badge variant="secondary">Idle</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <svg
            className="w-6 h-6 text-success-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'PROCESSING':
        return <Spinner size="sm" />;
      case 'ERROR':
        return (
          <svg
            className="w-6 h-6 text-danger-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-6 h-6 text-secondary-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  const formatDuration = (startTime?: Date, endTime?: Date): string => {
    if (!startTime) return '';
    const end = endTime || new Date();
    const duration = Math.floor((end.getTime() - new Date(startTime).getTime()) / 1000);
    
    if (duration < 60) return `${duration}s`;
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <Card>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-secondary-900">AI Agent Status</h3>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-success-500' : 'bg-danger-500'
              }`}
            />
            <span className="text-sm text-secondary-600">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        {/* Agent List */}
        <div className="space-y-3">
          {agents.map((agent) => (
            <div
              key={agent.agentName}
              className="p-4 border border-secondary-200 rounded-lg hover:border-primary-300 transition-colors"
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(agent.status)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-secondary-900">
                      {agent.agentName}
                    </h4>
                    {getStatusBadge(agent.status)}
                  </div>

                  {/* Message */}
                  <p className="text-sm text-secondary-600 mb-2">{agent.message}</p>

                  {/* Progress Bar */}
                  {agent.status === 'PROCESSING' && agent.progress !== undefined && (
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-xs text-secondary-600 mb-1">
                        <span>Progress</span>
                        <span>{agent.progress}%</span>
                      </div>
                      <div className="h-2 bg-secondary-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-600 transition-all duration-300"
                          style={{ width: `${agent.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Duration */}
                  {agent.startTime && (
                    <p className="text-xs text-secondary-500">
                      Duration: {formatDuration(agent.startTime, agent.endTime)}
                    </p>
                  )}

                  {/* Error */}
                  {agent.error && (
                    <div className="mt-2 p-2 bg-danger-50 border border-danger-200 rounded text-xs text-danger-800">
                      {agent.error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="pt-4 border-t border-secondary-200">
          <p className="text-xs text-secondary-600">
            💡 AI agents process your consultation data in real-time to generate clinical
            documents automatically.
          </p>
        </div>
      </div>
    </Card>
  );
}

// Made with Bob
