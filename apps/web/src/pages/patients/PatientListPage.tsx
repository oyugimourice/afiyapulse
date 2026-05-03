import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/hooks/useToast';
import PatientTable from '@/components/patients/PatientTable';
import PatientForm from '@/components/patients/PatientForm';
import {
  patientService,
  Patient,
  CreatePatientData,
  PatientSearchParams,
} from '@/services/patient.service';

export default function PatientListPage() {
  const { showToast } = useToast();
  
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  // Fetch patients
  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      const params: PatientSearchParams = {
        page: currentPage,
        limit: pageSize,
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      if (genderFilter) {
        params.gender = genderFilter as 'MALE' | 'FEMALE' | 'OTHER';
      }

      const response = await patientService.searchPatients(params);
      setPatients(response.data);
      setTotalPages(response.pagination.totalPages);
      setTotalCount(response.pagination.total);
    } catch (error) {
      showToast('Failed to fetch patients', 'error');
      console.error('Error fetching patients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [currentPage, searchQuery, genderFilter]);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1); // Reset to first page on search
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Create patient
  const handleCreate = async (data: CreatePatientData) => {
    try {
      setIsSubmitting(true);
      await patientService.createPatient(data);
      showToast('Patient created successfully', 'success');
      setIsCreateModalOpen(false);
      fetchPatients();
    } catch (error) {
      showToast('Failed to create patient', 'error');
      console.error('Error creating patient:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update patient
  const handleUpdate = async (data: CreatePatientData) => {
    if (!selectedPatient) return;

    try {
      setIsSubmitting(true);
      await patientService.updatePatient(selectedPatient.id, data);
      showToast('Patient updated successfully', 'success');
      setIsEditModalOpen(false);
      setSelectedPatient(null);
      fetchPatients();
    } catch (error) {
      showToast('Failed to update patient', 'error');
      console.error('Error updating patient:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete patient
  const handleDelete = async () => {
    if (!selectedPatient) return;

    try {
      setIsSubmitting(true);
      await patientService.deletePatient(selectedPatient.id);
      showToast('Patient deleted successfully', 'success');
      setIsDeleteModalOpen(false);
      setSelectedPatient(null);
      fetchPatients();
    } catch (error) {
      showToast('Failed to delete patient', 'error');
      console.error('Error deleting patient:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open edit modal
  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  // Open delete modal
  const handleDeleteClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Patients</h1>
          <p className="mt-1 text-sm text-secondary-600">
            Manage patient records and information
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsCreateModalOpen(true)}
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
          Add Patient
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
            />
          </div>
          <Select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            fullWidth
            options={[
              { value: '', label: 'All Genders' },
              { value: 'MALE', label: 'Male' },
              { value: 'FEMALE', label: 'Female' },
              { value: 'OTHER', label: 'Other' },
            ]}
          />
        </div>
        
        {/* Results count */}
        <div className="mt-4 text-sm text-secondary-600">
          Showing {patients.length} of {totalCount} patients
        </div>
      </div>

      {/* Patient Table */}
      <PatientTable
        patients={patients}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-secondary-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Patient Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Patient"
        size="xl"
      >
        <PatientForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={isSubmitting}
        />
      </Modal>

      {/* Edit Patient Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedPatient(null);
        }}
        title="Edit Patient"
        size="xl"
      >
        {selectedPatient && (
          <PatientForm
            patient={selectedPatient}
            onSubmit={handleUpdate}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedPatient(null);
            }}
            isLoading={isSubmitting}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedPatient(null);
        }}
        title="Delete Patient"
      >
        <div className="space-y-4">
          <p className="text-secondary-600">
            Are you sure you want to delete{' '}
            <span className="font-semibold">
              {selectedPatient?.firstName} {selectedPatient?.lastName}
            </span>
            ? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-4">
            <Button
              variant="ghost"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedPatient(null);
              }}
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
