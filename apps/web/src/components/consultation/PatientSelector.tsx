import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';
import { patientService, Patient } from '@/services/patient.service';
import { calculateAge } from '@/utils/date';

interface PatientSelectorProps {
  onSelect: (patient: Patient) => void;
  selectedPatient?: Patient | null;
}

export default function PatientSelector({
  onSelect,
  selectedPatient,
}: PatientSelectorProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch recent patients on mount
  useEffect(() => {
    fetchRecentPatients();
  }, []);

  // Search patients with debounce
  useEffect(() => {
    if (!searchQuery) {
      fetchRecentPatients();
      return;
    }

    const timer = setTimeout(() => {
      searchPatients();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchRecentPatients = async () => {
    try {
      setIsLoading(true);
      const response = await patientService.searchPatients({
        limit: 10,
        page: 1,
      });
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchPatients = async () => {
    try {
      setIsSearching(true);
      const response = await patientService.searchPatients({
        search: searchQuery,
        limit: 10,
        page: 1,
      });
      setPatients(response.data);
    } catch (error) {
      console.error('Error searching patients:', error);
    } finally {
      setIsSearching(false);
    }
  };

  if (selectedPatient) {
    return (
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-semibold text-primary-700">
                {selectedPatient.firstName[0]}
                {selectedPatient.lastName[0]}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-900">
                {selectedPatient.firstName} {selectedPatient.lastName}
              </h3>
              <p className="text-sm text-secondary-600">
                {calculateAge(new Date(selectedPatient.dateOfBirth))} years old •{' '}
                {selectedPatient.gender}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSelect(null as any)}
          >
            Change Patient
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-secondary-900">
            Select Patient
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/patients')}
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Patient
          </Button>
        </div>

        <Input
          placeholder="Search by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />

        {isLoading || isSearching ? (
          <div className="flex justify-center py-8">
            <Spinner size="md" />
          </div>
        ) : patients.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-secondary-600">
              {searchQuery ? 'No patients found' : 'No recent patients'}
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {patients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => onSelect(patient)}
                className="w-full p-4 text-left border border-secondary-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-secondary-700">
                      {patient.firstName[0]}
                      {patient.lastName[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-secondary-900 truncate">
                      {patient.firstName} {patient.lastName}
                    </p>
                    <p className="text-xs text-secondary-600">
                      {calculateAge(new Date(patient.dateOfBirth))} years •{' '}
                      {patient.gender} • {patient.phone}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-secondary-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

// Made with Bob
