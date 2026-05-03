import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import Spinner from '@/components/ui/Spinner';
import { useToast } from '@/hooks/useToast';
import {
  SOAPNoteEditor,
  PrescriptionEditor,
  ReferralEditor,
  AgentStatusDisplay,
} from '@/components/review';
import {
  reviewService,
  SOAPNote,
  Prescription,
  Referral,
} from '@/services/review.service';
import { consultationService, Consultation } from '@/services/consultation.service';

export default function ReviewPanelPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const consultationId = searchParams.get('consultation');
  const { showToast } = useToast();

  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [soapNote, setSOAPNote] = useState<SOAPNote | null>(null);
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [referral, setReferral] = useState<Referral | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showApproveAllModal, setShowApproveAllModal] = useState(false);

  useEffect(() => {
    if (consultationId) {
      fetchReviewData();
    } else {
      showToast('No consultation selected', 'error');
      navigate('/consultations/history');
    }
  }, [consultationId]);

  const fetchReviewData = async () => {
    if (!consultationId) return;

    try {
      setIsLoading(true);
      const [consultationData, reviewData] = await Promise.all([
        consultationService.getConsultation(consultationId),
        reviewService.getReviewDocuments(consultationId),
      ]);

      setConsultation(consultationData);
      setSOAPNote(reviewData.soapNote || null);
      setPrescription(reviewData.prescription || null);
      setReferral(reviewData.referral || null);
    } catch (error) {
      showToast('Failed to fetch review data', 'error');
      console.error('Error fetching review data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // SOAP Note handlers
  const handleUpdateSOAPNote = async (data: Partial<SOAPNote>) => {
    if (!soapNote) return;

    try {
      setIsSubmitting(true);
      const updated = await reviewService.updateSOAPNote(soapNote.id, data);
      setSOAPNote(updated);
      showToast('SOAP note updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update SOAP note', 'error');
      console.error('Error updating SOAP note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApproveSOAPNote = async () => {
    if (!soapNote) return;

    try {
      setIsSubmitting(true);
      const updated = await reviewService.approveSOAPNote(soapNote.id);
      setSOAPNote(updated);
      showToast('SOAP note approved', 'success');
    } catch (error) {
      showToast('Failed to approve SOAP note', 'error');
      console.error('Error approving SOAP note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectSOAPNote = async (reason: string, feedback: string) => {
    if (!soapNote) return;

    try {
      setIsSubmitting(true);
      const updated = await reviewService.rejectSOAPNote(soapNote.id, reason, feedback);
      setSOAPNote(updated);
      showToast('SOAP note rejected. AI will regenerate.', 'info');
    } catch (error) {
      showToast('Failed to reject SOAP note', 'error');
      console.error('Error rejecting SOAP note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prescription handlers
  const handleUpdatePrescription = async (data: Partial<Prescription>) => {
    if (!prescription) return;

    try {
      setIsSubmitting(true);
      const updated = await reviewService.updatePrescription(prescription.id, data);
      setPrescription(updated);
      showToast('Prescription updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update prescription', 'error');
      console.error('Error updating prescription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApprovePrescription = async () => {
    if (!prescription) return;

    try {
      setIsSubmitting(true);
      const updated = await reviewService.approvePrescription(prescription.id);
      setPrescription(updated);
      showToast('Prescription approved', 'success');
    } catch (error) {
      showToast('Failed to approve prescription', 'error');
      console.error('Error approving prescription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectPrescription = async (reason: string, feedback: string) => {
    if (!prescription) return;

    try {
      setIsSubmitting(true);
      const updated = await reviewService.rejectPrescription(prescription.id, reason, feedback);
      setPrescription(updated);
      showToast('Prescription rejected. AI will regenerate.', 'info');
    } catch (error) {
      showToast('Failed to reject prescription', 'error');
      console.error('Error rejecting prescription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Referral handlers
  const handleUpdateReferral = async (data: Partial<Referral>) => {
    if (!referral) return;

    try {
      setIsSubmitting(true);
      const updated = await reviewService.updateReferral(referral.id, data);
      setReferral(updated);
      showToast('Referral updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update referral', 'error');
      console.error('Error updating referral:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApproveReferral = async () => {
    if (!referral) return;

    try {
      setIsSubmitting(true);
      const updated = await reviewService.approveReferral(referral.id);
      setReferral(updated);
      showToast('Referral approved', 'success');
    } catch (error) {
      showToast('Failed to approve referral', 'error');
      console.error('Error approving referral:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectReferral = async (reason: string, feedback: string) => {
    if (!referral) return;

    try {
      setIsSubmitting(true);
      const updated = await reviewService.rejectReferral(referral.id, reason, feedback);
      setReferral(updated);
      showToast('Referral rejected. AI will regenerate.', 'info');
    } catch (error) {
      showToast('Failed to reject referral', 'error');
      console.error('Error rejecting referral:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Approve all
  const handleApproveAll = async () => {
    if (!consultationId) return;

    try {
      setIsSubmitting(true);
      await reviewService.approveAll(consultationId);
      showToast('All documents approved successfully', 'success');
      setShowApproveAllModal(false);
      navigate('/dashboard');
    } catch (error) {
      showToast('Failed to approve all documents', 'error');
      console.error('Error approving all:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canApproveAll = () => {
    return (
      soapNote?.status === 'DRAFT' ||
      prescription?.status === 'DRAFT' ||
      referral?.status === 'DRAFT'
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!consultation) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-secondary-900">Consultation not found</h2>
        <p className="mt-2 text-secondary-600">
          The consultation you're looking for doesn't exist.
        </p>
        <Button
          variant="primary"
          onClick={() => navigate('/consultations/history')}
          className="mt-4"
        >
          Back to History
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Review Panel</h1>
          <p className="mt-1 text-sm text-secondary-600">
            Review and approve AI-generated clinical documents
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="ghost"
            onClick={() => navigate('/consultations/history')}
          >
            Back to History
          </Button>
          {canApproveAll() && (
            <Button
              variant="success"
              onClick={() => setShowApproveAllModal(true)}
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Approve All
            </Button>
          )}
        </div>
      </div>

      {/* Consultation Info */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-secondary-900">
              Consultation #{consultation.id.slice(0, 8)}
            </h3>
            <p className="text-sm text-secondary-600">
              Patient: {consultation.patient?.firstName} {consultation.patient?.lastName}
            </p>
          </div>
          <div className="text-right text-sm text-secondary-600">
            <p>Status: {consultation.status}</p>
            <p>
              Date: {new Date(consultation.startTime).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Card>

      {/* Agent Status */}
      {consultationId && <AgentStatusDisplay consultationId={consultationId} />}

      {/* Documents */}
      <div className="space-y-6">
        {/* SOAP Note */}
        {soapNote ? (
          <SOAPNoteEditor
            soapNote={soapNote}
            onUpdate={handleUpdateSOAPNote}
            onApprove={handleApproveSOAPNote}
            onReject={handleRejectSOAPNote}
            isLoading={isSubmitting}
          />
        ) : (
          <Card>
            <div className="text-center py-8">
              <p className="text-sm text-secondary-600">
                SOAP note is being generated by AI...
              </p>
            </div>
          </Card>
        )}

        {/* Prescription */}
        {prescription ? (
          <PrescriptionEditor
            prescription={prescription}
            onUpdate={handleUpdatePrescription}
            onApprove={handleApprovePrescription}
            onReject={handleRejectPrescription}
            isLoading={isSubmitting}
          />
        ) : (
          <Card>
            <div className="text-center py-8">
              <p className="text-sm text-secondary-600">
                Prescription is being generated by AI...
              </p>
            </div>
          </Card>
        )}

        {/* Referral */}
        {referral && (
          <ReferralEditor
            referral={referral}
            onUpdate={handleUpdateReferral}
            onApprove={handleApproveReferral}
            onReject={handleRejectReferral}
            isLoading={isSubmitting}
          />
        )}
      </div>

      {/* Approve All Modal */}
      <Modal
        isOpen={showApproveAllModal}
        onClose={() => setShowApproveAllModal(false)}
        title="Approve All Documents"
      >
        <div className="space-y-4">
          <p className="text-secondary-600">
            Are you sure you want to approve all documents? This will finalize the consultation
            and make all documents available to the patient.
          </p>
          <div className="bg-info-50 border border-info-200 rounded-lg p-4">
            <p className="text-sm text-info-800">
              <strong>Note:</strong> Once approved, documents cannot be edited. Make sure you've
              reviewed all documents carefully.
            </p>
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              variant="ghost"
              onClick={() => setShowApproveAllModal(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={handleApproveAll}
              isLoading={isSubmitting}
            >
              Approve All Documents
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// Made with Bob
