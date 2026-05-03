import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/hooks/useToast';
import { useWebSocket } from '@/hooks/useWebSocket';
import {
  AudioRecorder,
  TranscriptDisplay,
  PatientSelector,
} from '@/components/consultation';
import {
  consultationService,
  Consultation,
  TranscriptSegment,
} from '@/services/consultation.service';
import { Patient } from '@/services/patient.service';

export default function NewConsultationPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { isConnected, sendMessage, subscribe } = useWebSocket('/consultation');

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [transcriptSegments, setTranscriptSegments] = useState<TranscriptSegment[]>([]);
  const [isStarting, setIsStarting] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  // Subscribe to WebSocket events
  useEffect(() => {
    if (!isConnected || !consultation) return;

    // Join consultation room
    sendMessage('join-consultation', { consultationId: consultation.id });

    // Subscribe to transcript updates
    const unsubscribeTranscript = subscribe('transcript-segment', (segment: TranscriptSegment) => {
      setTranscriptSegments((prev) => [...prev, segment]);
    });

    // Subscribe to agent updates
    const unsubscribeAgent = subscribe('agent-update', (data: any) => {
      console.log('Agent update:', data);
      // Handle agent status updates
    });

    return () => {
      unsubscribeTranscript();
      unsubscribeAgent();
    };
  }, [isConnected, consultation, sendMessage, subscribe]);

  // Start consultation
  const handleStartConsultation = async () => {
    if (!selectedPatient) {
      showToast('Please select a patient first', 'error');
      return;
    }

    try {
      setIsStarting(true);
      const newConsultation = await consultationService.createConsultation({
        patientId: selectedPatient.id,
      });
      setConsultation(newConsultation);
      showToast('Consultation started successfully', 'success');
    } catch (error) {
      showToast('Failed to start consultation', 'error');
      console.error('Error starting consultation:', error);
    } finally {
      setIsStarting(false);
    }
  };

  // Handle audio data
  const handleAudioData = useCallback(
    async (chunk: Blob, sequence: number) => {
      if (!consultation) return;

      try {
        await consultationService.uploadAudioChunk(consultation.id, {
          chunk,
          sequence,
          isLast: false,
        });
      } catch (error) {
        console.error('Error uploading audio chunk:', error);
      }
    },
    [consultation]
  );

  // Stop recording
  const handleStopRecording = () => {
    setShowCompleteModal(true);
  };

  // Complete consultation
  const handleCompleteConsultation = async () => {
    if (!consultation) return;

    try {
      setIsCompleting(true);
      await consultationService.completeConsultation(consultation.id);
      showToast('Consultation completed successfully', 'success');
      navigate('/review');
    } catch (error) {
      showToast('Failed to complete consultation', 'error');
      console.error('Error completing consultation:', error);
    } finally {
      setIsCompleting(false);
      setShowCompleteModal(false);
    }
  };

  // Cancel consultation
  const handleCancelConsultation = async () => {
    if (!consultation) return;

    try {
      await consultationService.cancelConsultation(consultation.id);
      showToast('Consultation cancelled', 'info');
      navigate('/dashboard');
    } catch (error) {
      showToast('Failed to cancel consultation', 'error');
      console.error('Error cancelling consultation:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">New Consultation</h1>
          <p className="mt-1 text-sm text-secondary-600">
            Record and transcribe patient consultation in real-time
          </p>
        </div>
        {consultation && (
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Cancel
          </Button>
        )}
      </div>

      {/* WebSocket Connection Status */}
      {consultation && (
        <Card>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-success-500' : 'bg-danger-500'
              }`}
            />
            <span className="text-sm text-secondary-600">
              {isConnected ? 'Connected to server' : 'Disconnected from server'}
            </span>
          </div>
        </Card>
      )}

      {/* Patient Selection */}
      {!consultation && (
        <>
          <PatientSelector
            selectedPatient={selectedPatient}
            onSelect={setSelectedPatient}
          />

          {selectedPatient && (
            <div className="flex justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={handleStartConsultation}
                isLoading={isStarting}
                className="px-12"
              >
                Start Consultation
              </Button>
            </div>
          )}
        </>
      )}

      {/* Active Consultation */}
      {consultation && (
        <>
          {/* Patient Info */}
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary-700">
                    {selectedPatient?.firstName[0]}
                    {selectedPatient?.lastName[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900">
                    {selectedPatient?.firstName} {selectedPatient?.lastName}
                  </h3>
                  <p className="text-sm text-secondary-600">
                    Consultation ID: {consultation.id.slice(0, 8)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1 bg-success-100 text-success-800 rounded-full text-sm font-medium">
                  In Progress
                </div>
              </div>
            </div>
          </Card>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Audio Recorder */}
            <div>
              <AudioRecorder
                onDataAvailable={handleAudioData}
                onStop={handleStopRecording}
                isDisabled={!isConnected}
              />
            </div>

            {/* Transcript Display */}
            <div>
              <TranscriptDisplay
                segments={transcriptSegments}
                isLoading={isConnected}
              />
            </div>
          </div>

          {/* Agent Status (Placeholder for Phase 3.2) */}
          <Card>
            <div className="text-center py-8">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-secondary-900">
                AI Agents Processing
              </h3>
              <p className="mt-1 text-sm text-secondary-500">
                Real-time agent status will appear here
              </p>
            </div>
          </Card>
        </>
      )}

      {/* Complete Consultation Modal */}
      <Modal
        isOpen={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        title="Complete Consultation"
      >
        <div className="space-y-4">
          <p className="text-secondary-600">
            Are you sure you want to complete this consultation? The AI agents will process
            the transcript and generate the clinical documents.
          </p>
          <div className="bg-info-50 border border-info-200 rounded-lg p-4">
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
                <p className="text-sm font-medium text-info-800">What happens next?</p>
                <ul className="mt-2 text-sm text-info-700 list-disc list-inside space-y-1">
                  <li>SOAP note will be generated</li>
                  <li>Prescriptions will be drafted</li>
                  <li>Referral letters will be created (if needed)</li>
                  <li>Follow-up appointments will be scheduled</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              variant="ghost"
              onClick={() => setShowCompleteModal(false)}
              disabled={isCompleting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCompleteConsultation}
              isLoading={isCompleting}
            >
              Complete Consultation
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// Made with Bob
