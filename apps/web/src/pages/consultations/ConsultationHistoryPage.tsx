import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Spinner from '@/components/ui/Spinner';
import { useToast } from '@/hooks/useToast';
import {
  consultationService,
  Consultation,
  ConsultationListParams,
} from '@/services/consultation.service';
import { formatDate, formatTime } from '@/utils/date';

export default function ConsultationHistoryPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  // Fetch consultations
  const fetchConsultations = async () => {
    try {
      setIsLoading(true);
      const params: ConsultationListParams = {
        page: currentPage,
        limit: pageSize,
      };

      if (statusFilter) {
        params.status = statusFilter as any;
      }

      const response = await consultationService.getConsultations(params);
      setConsultations(response.consultations);
      setTotalPages(response.totalPages);
      setTotalCount(response.total);
    } catch (error) {
      showToast('Failed to fetch consultations', 'error');
      console.error('Error fetching consultations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, [currentPage, statusFilter]);

  const getStatusBadgeVariant = (status: string): 'success' | 'warning' | 'secondary' => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'IN_PROGRESS':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'COMPLETED':
        return 'Completed';
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'CANCELLED':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Consultation History</h1>
          <p className="mt-1 text-sm text-secondary-600">
            View and manage past consultations
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate('/consultations/new')}
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
          New Consultation
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Search by patient name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
            />
          </div>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            fullWidth
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'IN_PROGRESS', label: 'In Progress' },
              { value: 'COMPLETED', label: 'Completed' },
              { value: 'CANCELLED', label: 'Cancelled' },
            ]}
          />
        </div>
        <div className="mt-4 text-sm text-secondary-600">
          Showing {consultations.length} of {totalCount} consultations
        </div>
      </Card>

      {/* Consultations List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : consultations.length === 0 ? (
        <Card>
          <div className="text-center py-12">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-secondary-900">
              No consultations found
            </h3>
            <p className="mt-1 text-sm text-secondary-500">
              Get started by creating a new consultation
            </p>
            <div className="mt-6">
              <Button
                variant="primary"
                onClick={() => navigate('/consultations/new')}
              >
                New Consultation
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {consultations.map((consultation) => (
            <Card key={consultation.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-secondary-900">
                        {consultation.patient
                          ? `${consultation.patient.firstName} ${consultation.patient.lastName}`
                          : 'Unknown Patient'}
                      </h3>
                      <Badge variant={getStatusBadgeVariant(consultation.status)}>
                        {getStatusLabel(consultation.status)}
                      </Badge>
                    </div>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-secondary-600">
                      <span>
                        📅 {formatDate(new Date(consultation.startTime))}
                      </span>
                      <span>
                        🕐 {formatTime(new Date(consultation.startTime))}
                      </span>
                      {consultation.endTime && (
                        <span>
                          ⏱️ Duration:{' '}
                          {Math.round(
                            (new Date(consultation.endTime).getTime() -
                              new Date(consultation.startTime).getTime()) /
                              60000
                          )}{' '}
                          min
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center space-x-2 text-xs text-secondary-500">
                      <span>ID: {consultation.id.slice(0, 8)}</span>
                      {consultation.soapNoteId && (
                        <span className="px-2 py-0.5 bg-success-100 text-success-800 rounded">
                          SOAP Note
                        </span>
                      )}
                      {consultation.prescriptionId && (
                        <span className="px-2 py-0.5 bg-info-100 text-info-800 rounded">
                          Prescription
                        </span>
                      )}
                      {consultation.referralId && (
                        <span className="px-2 py-0.5 bg-warning-100 text-warning-800 rounded">
                          Referral
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/consultations/${consultation.id}`)}
                  >
                    View Details
                  </Button>
                  {consultation.status === 'COMPLETED' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/review?consultation=${consultation.id}`)}
                    >
                      Review Documents
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
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
        </Card>
      )}
    </div>
  );
}

// Made with Bob
