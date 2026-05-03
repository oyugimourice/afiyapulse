import { useEffect, useRef } from 'react';
import { TranscriptSegment } from '@/services/consultation.service';
import { formatTime } from '@/utils/date';

interface TranscriptDisplayProps {
  segments: TranscriptSegment[];
  isLoading?: boolean;
}

export default function TranscriptDisplay({
  segments,
  isLoading = false,
}: TranscriptDisplayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new segments arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [segments]);

  const getSpeakerColor = (speaker: 'DOCTOR' | 'PATIENT'): string => {
    return speaker === 'DOCTOR' ? 'text-primary-700' : 'text-secondary-700';
  };

  const getSpeakerBg = (speaker: 'DOCTOR' | 'PATIENT'): string => {
    return speaker === 'DOCTOR' ? 'bg-primary-50' : 'bg-secondary-50';
  };

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    return formatTime(date);
  };

  if (segments.length === 0 && !isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-secondary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-secondary-900">No transcript yet</h3>
        <p className="mt-1 text-sm text-secondary-500">
          Start recording to see the real-time transcription
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-secondary-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-secondary-900">
            Live Transcription
          </h3>
          <div className="flex items-center space-x-2">
            {isLoading && (
              <>
                <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
                <span className="text-sm text-secondary-600">Transcribing...</span>
              </>
            )}
            <span className="text-sm text-secondary-500">
              {segments.length} segment{segments.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Transcript Content */}
      <div
        ref={scrollRef}
        className="px-6 py-4 max-h-[600px] overflow-y-auto space-y-4"
      >
        {segments.map((segment) => (
          <div
            key={segment.id}
            className={`p-4 rounded-lg ${getSpeakerBg(segment.speaker)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-semibold ${getSpeakerColor(segment.speaker)}`}>
                  {segment.speaker === 'DOCTOR' ? '👨‍⚕️ Doctor' : '🧑 Patient'}
                </span>
                {segment.confidence < 0.8 && (
                  <span className="text-xs px-2 py-0.5 bg-warning-100 text-warning-800 rounded">
                    Low confidence
                  </span>
                )}
              </div>
              <span className="text-xs text-secondary-500">
                {formatTimestamp(segment.timestamp)}
              </span>
            </div>
            <p className="text-sm text-secondary-900 leading-relaxed">
              {segment.text}
            </p>
            {segment.confidence < 1 && (
              <div className="mt-2 flex items-center space-x-2">
                <div className="flex-1 h-1 bg-secondary-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      segment.confidence >= 0.8
                        ? 'bg-success-500'
                        : segment.confidence >= 0.6
                        ? 'bg-warning-500'
                        : 'bg-danger-500'
                    }`}
                    style={{ width: `${segment.confidence * 100}%` }}
                  />
                </div>
                <span className="text-xs text-secondary-500">
                  {Math.round(segment.confidence * 100)}%
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-secondary-200 bg-secondary-50">
        <p className="text-xs text-secondary-600">
          💡 Tip: The transcript updates in real-time as the conversation progresses
        </p>
      </div>
    </div>
  );
}

// Made with Bob
