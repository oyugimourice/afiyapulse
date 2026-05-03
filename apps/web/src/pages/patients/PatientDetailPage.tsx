import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Spinner from '@/components/ui/Spinner';
import { useToast } from '@/hooks/useToast';
import PatientForm from '@/components/patients/PatientForm';
import {
  patientService,
  Patient,
  CreatePatientData,
} from '@/services/patient.service';
import { formatDate, calculateAge } from '@/utils/date';

export default function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPatient();
    }
  }, [id]);

  const fetchPatient = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      const data = await patientService.getPatient(id);
      setPatient(data);
    } catch (error) {
      showToast('Failed to fetch patient details', 'error');
      console.error('Error fetching patient:', error);
      navigate('/patients');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (data: CreatePatientData) => {
    if (!id) return;

    try {
      setIsSubmitting(true);
      await patientService.updatePatient(id, data);
      showToast('Patient updated successfully', 'success');
      setIsEditModalOpen(false);
      fetchPatient();
    } catch (error) {
      showToast('Failed to update patient', 'error');
      console.error('Error updating patient:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      setIsSubmitting(true);
      await patientService.deletePatient(id);
      showToast('Patient deleted successfully', 'success');
      navigate('/patients');
    } catch (error) {
      showToast('Failed to delete patient', 'error');
      console.error('Error deleting patient:', error);
    } finally {
      setIsSubmitting(false);
      setIsDeleteModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-secondary-900">Patient not found</h2>
        <p className="mt-2 text-secondary-600">The patient you're looking for doesn't exist.</p>
        <Button
          variant="primary"
          onClick={() => navigate('/patients')}
          className="mt-4"
        >
          Back to Patients
        </Button>
      </div>
    );
  }

  const getGenderBadgeVariant = (gender: string): 'info' | 'warning' | 'secondary' => {
    switch (gender) {
      case 'MALE':
        return 'info';
      case 'FEMALE':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/patients')}
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </Button>
            <h1 className="text-2xl font-bold text-secondary-900">
              {patient.firstName} {patient.lastName}
            </h1>
            <Badge variant={getGenderBadgeVariant(patient.gender)}>
              {patient.gender}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-secondary-600">
            Patient ID: {patient.id}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit Patient
          </Button>
          <Button
            variant="danger"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete Patient
          </Button>
        </div>
      </div>

      {/* Personal Information */}
      <Card>
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-secondary-500">Date of Birth</label>
            <p className="mt-1 text-secondary-900">
              {formatDate(new Date(patient.dateOfBirth), 'long')}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-secondary-500">Age</label>
            <p className="mt-1 text-secondary-900">
              {calculateAge(new Date(patient.dateOfBirth))} years old
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-secondary-500">Email</label>
            <p className="mt-1 text-secondary-900">
              {patient.email || 'Not provided'}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-secondary-500">Phone</label>
            <p className="mt-1 text-secondary-900">{patient.phone}</p>
          </div>
          {patient.address && (
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-secondary-500">Address</label>
              <p className="mt-1 text-secondary-900">{patient.address}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Medical Information */}
      <Card>
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">
          Medical Information
        </h2>
        <div className="space-y-6">
          {patient.medicalHistory && (
            <div>
              <label className="text-sm font-medium text-secondary-500">Medical History</label>
              <p className="mt-1 text-secondary-900 whitespace-pre-wrap">
                {patient.medicalHistory}
              </p>
            </div>
          )}
          {patient.allergies && (
            <div>
              <label className="text-sm font-medium text-secondary-500">Allergies</label>
              <p className="mt-1 text-secondary-900 whitespace-pre-wrap">
                {patient.allergies.join(', ')}
              </p>
            </div>
          )}
          {patient.currentMedications && (
            <div>
              <label className="text-sm font-medium text-secondary-500">Current Medications</label>
              <p className="mt-1 text-secondary-900 whitespace-pre-wrap">
                {patient.currentMedications}
              </p>
            </div>
          )}
          {!patient.medicalHistory && !patient.allergies && !patient.currentMedications && (
            <p className="text-secondary-500 italic">No medical information available</p>
          )}
        </div>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">
          Emergency Contact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-secondary-500">Contact Name</label>
            <p className="mt-1 text-secondary-900">
              {patient.emergencyContact || 'Not provided'}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-secondary-500">Contact Phone</label>
            <p className="mt-1 text-secondary-900">
              {patient.emergencyPhone || 'Not provided'}
            </p>
          </div>
        </div>
      </Card>

      {/* Insurance Information */}
      <Card>
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">
          Insurance Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-secondary-500">Insurance Provider</label>
            <p className="mt-1 text-secondary-900">
              {patient.insuranceProvider || 'Not provided'}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-secondary-500">Insurance Number</label>
            <p className="mt-1 text-secondary-900">
              {patient.insuranceNumber || 'Not provided'}
            </p>
          </div>
        </div>
      </Card>

      {/* Record Information */}
      <Card>
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">
          Record Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-secondary-500">Created At</label>
            <p className="mt-1 text-secondary-900">
              {formatDate(new Date(patient.createdAt), 'long')}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-secondary-500">Last Updated</label>
            <p className="mt-1 text-secondary-900">
              {formatDate(new Date(patient.updatedAt), 'long')}
            </p>
          </div>
        </div>
      </Card>

      {/* Edit Patient Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Patient"
        size="xl"
      >
        <PatientForm
          patient={patient}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditModalOpen(false)}
          isLoading={isSubmitting}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Patient"
      >
        <div className="space-y-4">
          <p className="text-secondary-600">
            Are you sure you want to delete{' '}
            <span className="font-semibold">
              {patient.firstName} {patient.lastName}
            </span>
            ? This action cannot be undone and will permanently remove all patient data.
          </p>
          <div className="flex justify-end space-x-4">
            <Button
              variant="ghost"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              isLoading={isSubmitting}
            >
              Delete Patient
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// Made with Bob
