import { useState } from 'react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Alert from '@/components/ui/Alert';
import { Prescription, Medication } from '@/services/review.service';

interface PrescriptionEditorProps {
  prescription: Prescription;
  onUpdate: (data: Partial<Prescription>) => Promise<void>;
  onApprove: () => Promise<void>;
  onReject: (reason: string, feedback: string) => Promise<void>;
  isLoading?: boolean;
}

export default function PrescriptionEditor({
  prescription,
  onUpdate,
  onApprove,
  onReject,
  isLoading = false,
}: PrescriptionEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrescription, setEditedPrescription] = useState(prescription);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectFeedback, setRejectFeedback] = useState('');

  const handleSave = async () => {
    await onUpdate({
      medications: editedPrescription.medications,
      pharmacyInstructions: editedPrescription.pharmacyInstructions,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPrescription(prescription);
    setIsEditing(false);
  };

  const handleReject = async () => {
    if (!rejectReason || !rejectFeedback) return;
    await onReject(rejectReason, rejectFeedback);
    setShowRejectModal(false);
    setRejectReason('');
    setRejectFeedback('');
  };

  const updateMedication = (index: number, field: keyof Medication, value: string) => {
    const updatedMedications = [...editedPrescription.medications];
    updatedMedications[index] = {
      ...updatedMedications[index],
      [field]: value,
    };
    setEditedPrescription({
      ...editedPrescription,
      medications: updatedMedications,
    });
  };

  const removeMedication = (index: number) => {
    const updatedMedications = editedPrescription.medications.filter((_, i) => i !== index);
    setEditedPrescription({
      ...editedPrescription,
      medications: updatedMedications,
    });
  };

  const addMedication = () => {
    setEditedPrescription({
      ...editedPrescription,
      medications: [
        ...editedPrescription.medications,
        {
          drugName: '',
          dosage: '',
          frequency: '',
          duration: '',
          instructions: '',
        },
      ],
    });
  };

  const getStatusBadge = () => {
    switch (prescription.status) {
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
              <h3 className="text-lg font-semibold text-secondary-900">Prescription</h3>
              {getStatusBadge()}
            </div>
            {prescription.status === 'DRAFT' && !isEditing && (
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

          {/* Medications */}
          <div className="space-y-4">
            {(isEditing ? editedPrescription : prescription).medications.map((med, index) => (
              <div
                key={index}
                className="p-4 border border-secondary-200 rounded-lg space-y-3"
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-secondary-900">
                    Medication {index + 1}
                  </h4>
                  {isEditing && (
                    <button
                      onClick={() => removeMedication(index)}
                      className="text-danger-600 hover:text-danger-700"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      label="Drug Name"
                      value={med.drugName}
                      onChange={(e) => updateMedication(index, 'drugName', e.target.value)}
                      fullWidth
                    />
                    <Input
                      label="Dosage"
                      value={med.dosage}
                      onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                      placeholder="e.g., 500mg"
                      fullWidth
                    />
                    <Input
                      label="Frequency"
                      value={med.frequency}
                      onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                      placeholder="e.g., Twice daily"
                      fullWidth
                    />
                    <Input
                      label="Duration"
                      value={med.duration}
                      onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                      placeholder="e.g., 7 days"
                      fullWidth
                    />
                    <div className="md:col-span-2">
                      <Textarea
                        label="Instructions"
                        value={med.instructions}
                        onChange={(e) =>
                          updateMedication(index, 'instructions', e.target.value)
                        }
                        rows={2}
                        fullWidth
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-secondary-600">Drug:</span>
                        <span className="ml-2 font-medium text-secondary-900">
                          {med.drugName}
                        </span>
                      </div>
                      <div>
                        <span className="text-secondary-600">Dosage:</span>
                        <span className="ml-2 font-medium text-secondary-900">
                          {med.dosage}
                        </span>
                      </div>
                      <div>
                        <span className="text-secondary-600">Frequency:</span>
                        <span className="ml-2 font-medium text-secondary-900">
                          {med.frequency}
                        </span>
                      </div>
                      <div>
                        <span className="text-secondary-600">Duration:</span>
                        <span className="ml-2 font-medium text-secondary-900">
                          {med.duration}
                        </span>
                      </div>
                    </div>
                    {med.instructions && (
                      <div className="text-sm">
                        <span className="text-secondary-600">Instructions:</span>
                        <p className="mt-1 text-secondary-900">{med.instructions}</p>
                      </div>
                    )}
                    {med.interactions && med.interactions.length > 0 && (
                      <Alert type="warning" className="mt-2">
                        <strong>Drug Interactions:</strong> {med.interactions.join(', ')}
                      </Alert>
                    )}
                    {med.warnings && med.warnings.length > 0 && (
                      <Alert type="error" className="mt-2">
                        <strong>Warnings:</strong> {med.warnings.join(', ')}
                      </Alert>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isEditing && (
              <Button
                variant="outline"
                onClick={addMedication}
                className="w-full"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Medication
              </Button>
            )}
          </div>

          {/* Pharmacy Instructions */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Pharmacy Instructions
            </label>
            {isEditing ? (
              <Textarea
                value={editedPrescription.pharmacyInstructions || ''}
                onChange={(e) =>
                  setEditedPrescription({
                    ...editedPrescription,
                    pharmacyInstructions: e.target.value,
                  })
                }
                rows={3}
                placeholder="Special instructions for the pharmacy..."
                fullWidth
              />
            ) : prescription.pharmacyInstructions ? (
              <div className="p-4 bg-secondary-50 rounded-lg">
                <p className="text-sm text-secondary-900">
                  {prescription.pharmacyInstructions}
                </p>
              </div>
            ) : (
              <p className="text-sm text-secondary-500 italic">No pharmacy instructions</p>
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
          ) : prescription.status === 'DRAFT' ? (
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
              Reject Prescription
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
                  <option value="DRUG_INTERACTION">Drug Interaction</option>
                  <option value="INCORRECT_DOSAGE">Incorrect Dosage</option>
                  <option value="CONTRAINDICATION">Contraindication</option>
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
