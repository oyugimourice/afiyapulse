import { useState } from 'react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Referral } from '@/services/review.service';

interface ReferralEditorProps {
  referral: Referral;
  onUpdate: (data: Partial<Referral>) => Promise<void>;
  onApprove: () => Promise<void>;
  onReject: (reason: string, feedback: string) => Promise<void>;
  isLoading?: boolean;
}

export default function ReferralEditor({
  referral,
  onUpdate,
  onApprove,
  onReject,
  isLoading = false,
}: ReferralEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedReferral, setEditedReferral] = useState(referral);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectFeedback, setRejectFeedback] = useState('');

  const handleSave = async () => {
    await onUpdate({
      specialty: editedReferral.specialty,
      reason: editedReferral.reason,
      urgency: editedReferral.urgency,
      notes: editedReferral.notes,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedReferral(referral);
    setIsEditing(false);
  };

  const handleReject = async () => {
    if (!rejectReason || !rejectFeedback) return;
    await onReject(rejectReason, rejectFeedback);
    setShowRejectModal(false);
    setRejectReason('');
    setRejectFeedback('');
  };

  const getStatusBadge = () => {
    switch (referral.status) {
      case 'APPROVED':
        return <Badge variant="success">Approved</Badge>;
      case 'REJECTED':
        return <Badge variant="danger">Rejected</Badge>;
      default:
        return <Badge variant="warning">Draft</Badge>;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'EMERGENCY':
        return <Badge variant="danger">Emergency</Badge>;
      case 'URGENT':
        return <Badge variant="warning">Urgent</Badge>;
      default:
        return <Badge variant="info">Routine</Badge>;
    }
  };

  return (
    <>
      <Card>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-secondary-900">Referral Letter</h3>
              {getStatusBadge()}
            </div>
            {referral.status === 'DRAFT' && !isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </Button>
            )}
          </div>

          {/* Specialty */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Specialty
            </label>
            {isEditing ? (
              <Input
                value={editedReferral.specialty}
                onChange={(e) =>
                  setEditedReferral({ ...editedReferral, specialty: e.target.value })
                }
                placeholder="e.g., Cardiology, Orthopedics"
                fullWidth
              />
            ) : (
              <div className="p-4 bg-secondary-50 rounded-lg">
                <p className="text-sm font-medium text-secondary-900">{referral.specialty}</p>
              </div>
            )}
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Urgency Level
            </label>
            {isEditing ? (
              <Select
                value={editedReferral.urgency}
                onChange={(e) =>
                  setEditedReferral({
                    ...editedReferral,
                    urgency: e.target.value as 'ROUTINE' | 'URGENT' | 'EMERGENCY',
                  })
                }
                fullWidth
                options={[
                  { value: 'ROUTINE', label: 'Routine' },
                  { value: 'URGENT', label: 'Urgent' },
                  { value: 'EMERGENCY', label: 'Emergency' },
                ]}
              />
            ) : (
              <div>{getUrgencyBadge(referral.urgency)}</div>
            )}
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Reason for Referral
            </label>
            {isEditing ? (
              <Textarea
                value={editedReferral.reason}
                onChange={(e) =>
                  setEditedReferral({ ...editedReferral, reason: e.target.value })
                }
                rows={4}
                fullWidth
              />
            ) : (
              <div className="p-4 bg-secondary-50 rounded-lg">
                <p className="text-sm text-secondary-900 whitespace-pre-wrap">
                  {referral.reason}
                </p>
              </div>
            )}
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Additional Notes
            </label>
            {isEditing ? (
              <Textarea
                value={editedReferral.notes || ''}
                onChange={(e) =>
                  setEditedReferral({ ...editedReferral, notes: e.target.value })
                }
                rows={3}
                placeholder="Any additional information for the specialist..."
                fullWidth
              />
            ) : referral.notes ? (
              <div className="p-4 bg-secondary-50 rounded-lg">
                <p className="text-sm text-secondary-900 whitespace-pre-wrap">
                  {referral.notes}
                </p>
              </div>
            ) : (
              <p className="text-sm text-secondary-500 italic">No additional notes</p>
            )}
          </div>

          {/* Actions */}
          {isEditing ? (
            <div className="flex justify-end space-x-4 pt-4 border-t border-secondary-200">
              <Button
                variant="ghost"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
                isLoading={isLoading}
              >
                Save Changes
              </Button>
            </div>
          ) : referral.status === 'DRAFT' ? (
            <div className="flex justify-end space-x-4 pt-4 border-t border-secondary-200">
              <Button
                variant="danger"
                onClick={() => setShowRejectModal(true)}
                disabled={isLoading}
              >
                Reject
              </Button>
              <Button
                variant="success"
                onClick={onApprove}
                isLoading={isLoading}
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Approve
              </Button>
            </div>
          ) : null}
        </div>
      </Card>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">
              Reject Referral
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Reason
                </label>
                <select
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select a reason</option>
                  <option value="INSUFFICIENT_INFO">Insufficient Information</option>
                  <option value="WRONG_SPECIALTY">Wrong Specialty</option>
                  <option value="NOT_NECESSARY">Not Necessary</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <Textarea
                label="Feedback"
                value={rejectFeedback}
                onChange={(e) => setRejectFeedback(e.target.value)}
                rows={4}
                placeholder="Provide detailed feedback for regeneration..."
                fullWidth
              />
              <div className="flex justify-end space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowRejectModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={handleReject}
                  disabled={!rejectReason || !rejectFeedback}
                >
                  Reject & Regenerate
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Made with Bob
