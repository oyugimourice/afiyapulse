import { useEffect } from 'react';
import Button from '@/components/ui/Button';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';

interface AudioRecorderProps {
  onDataAvailable: (chunk: Blob, sequence: number) => void;
  onStart?: () => void;
  onStop?: () => void;
  isDisabled?: boolean;
}

export default function AudioRecorder({
  onDataAvailable,
  onStart,
  onStop,
  isDisabled = false,
}: AudioRecorderProps) {
  const {
    isRecording,
    isPaused,
    duration,
    audioLevel,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    error,
  } = useAudioRecorder(onDataAvailable);

  useEffect(() => {
    if (isRecording && onStart) {
      onStart();
    }
  }, [isRecording, onStart]);

  const handleStart = async () => {
    await startRecording();
  };

  const handleStop = () => {
    stopRecording();
    if (onStop) {
      onStop();
    }
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-danger-50 border border-danger-200 rounded-lg">
          <p className="text-sm text-danger-800">{error}</p>
        </div>
      )}

      {/* Audio Level Visualizer */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-secondary-700">Audio Level</span>
          <span className="text-sm text-secondary-500">{Math.round(audioLevel)}%</span>
        </div>
        <div className="h-2 bg-secondary-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-600 transition-all duration-100"
            style={{ width: `${audioLevel}%` }}
          />
        </div>
      </div>

      {/* Duration Display */}
      <div className="text-center mb-6">
        <div className="text-4xl font-mono font-bold text-secondary-900">
          {formatDuration(duration)}
        </div>
        <div className="mt-2 flex items-center justify-center space-x-2">
          {isRecording && !isPaused && (
            <>
              <div className="w-3 h-3 bg-danger-600 rounded-full animate-pulse" />
              <span className="text-sm text-secondary-600">Recording</span>
            </>
          )}
          {isPaused && (
            <>
              <div className="w-3 h-3 bg-warning-600 rounded-full" />
              <span className="text-sm text-secondary-600">Paused</span>
            </>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center space-x-4">
        {!isRecording ? (
          <Button
            variant="primary"
            size="lg"
            onClick={handleStart}
            disabled={isDisabled}
            className="px-8"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            Start Recording
          </Button>
        ) : (
          <>
            {!isPaused ? (
              <Button
                variant="secondary"
                size="lg"
                onClick={pauseRecording}
                className="px-8"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Pause
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={resumeRecording}
                className="px-8"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Resume
              </Button>
            )}
            <Button
              variant="danger"
              size="lg"
              onClick={handleStop}
              className="px-8"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                />
              </svg>
              Stop Recording
            </Button>
          </>
        )}
      </div>

      {/* Microphone Permission Info */}
      {!isRecording && (
        <div className="mt-6 p-4 bg-info-50 border border-info-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <svg
              className="w-5 h-5 text-info-600 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-info-800">Microphone Access Required</p>
              <p className="mt-1 text-sm text-info-700">
                Please allow microphone access when prompted to start recording the consultation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Made with Bob
