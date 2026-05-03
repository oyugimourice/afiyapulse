import { useState } from 'react';
import Card from '@/components/ui/Card';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { SOAPNote } from '@/services/review.service';

interface SOAPNoteEditorProps {
  soapNote: SOAPNote;
  onUpdate: (data: Partial<SOAPNote>) => Promise<void>;
  onApprove: () => Promise<void>;
  onReject: (reason: string, feedback: string) => Promise<void>;
  isLoading?: boolean;
}

export default function SOAPNoteEditor({
  soapNote,
  onUpdate,
  onApprove,
  onReject,
  isLoading = false,
}: SOAPNoteEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(soapNote);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectFeedback, setRejectFeedback] = useState('');

  const handleSave = async () => {
    await onUpdate({
      subjective: editedNote.subjective,
      objective: editedNote.objective,
      assessment: editedNote.assessment,
      plan: editedNote.plan,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedNote(soapNote);
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
    switch (soapNote.status) {
      case 'APPROVED':
        return <Badge variant="success">Approved</Badge>;
      case 'REJECTED':
        return <Badge variant="danger">Rejected</Badge>;
      default:
        return <Badge variant="warning">Draft</Badge>;
    }
  };

  return (
    <>
      <Card>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-secondary-900">SOAP Note</h3>
              {getStatusBadge()}
            </div>
            {soapNote.status === 'DRAFT' && !isEditing && (
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

          {/* Subjective */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Subjective (Patient's Description)
            </label>
            {isEditing ? (
              <Textarea
                value={editedNote.subjective}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, subjective: e.target.value })
                }
                rows={4}
                fullWidth
              />
            ) : (
              <div className="p-4 bg-secondary-50 rounded-lg">
                <p className="text-sm text-secondary-900 whitespace-pre-wrap">
                  {soapNote.subjective}
                </p>
              </div>
            )}
          </div>

          {/* Objective */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Objective (Clinical Findings)
            </label>
            {isEditing ? (
              <Textarea
                value={editedNote.objective}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, objective: e.target.value })
                }
                rows={4}
                fullWidth
              />
            ) : (
              <div className="p-4 bg-secondary-50 rounded-lg">
                <p className="text-sm text-secondary-900 whitespace-pre-wrap">
                  {soapNote.objective}
                </p>
              </div>
            )}
          </div>

          {/* Assessment */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Assessment (Diagnosis)
            </label>
            {isEditing ? (
              <Textarea
                value={editedNote.assessment}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, assessment: e.target.value })
                }
                rows={4}
                fullWidth
              />
            ) : (
              <div className="p-4 bg-secondary-50 rounded-lg">
                <p className="text-sm text-secondary-900 whitespace-pre-wrap">
                  {soapNote.assessment}
                </p>
              </div>
            )}
          </div>

          {/* Plan */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Plan (Treatment Plan)
            </label>
            {isEditing ? (
              <Textarea
                value={editedNote.plan}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, plan: e.target.value })
                }
                rows={4}
                fullWidth
              />
            ) : (
              <div className="p-4 bg-secondary-50 rounded-lg">
                <p className="text-sm text-secondary-900 whitespace-pre-wrap">
                  {soapNote.plan}
                </p>
              </div>
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
          ) : soapNote.status === 'DRAFT' ? (
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
              Reject SOAP Note
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
                  <option value="INACCURATE">Inaccurate Information</option>
                  <option value="INCOMPLETE">Incomplete</option>
                  <option value="FORMATTING">Formatting Issues</option>
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
