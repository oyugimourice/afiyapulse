import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Patient } from '@/services/patient.service';
import { formatDate, calculateAge } from '@/utils/date';

interface PatientTableProps {
  patients: Patient[];
  isLoading?: boolean;
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
}

export default function PatientTable({
  patients,
  isLoading = false,
  onEdit,
  onDelete,
}: PatientTableProps) {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<keyof Patient>('lastName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Patient) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedPatients = [...patients].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

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

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-2 text-secondary-600">Loading patients...</p>
        </div>
      </div>
    );
  }

  if (patients.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-8 text-center">
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-secondary-900">No patients found</h3>
          <p className="mt-1 text-sm text-secondary-500">
            Get started by creating a new patient.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <button
                onClick={() => handleSort('lastName')}
                className="flex items-center space-x-1 hover:text-secondary-700"
              >
                <span>Name</span>
                {sortField === 'lastName' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => handleSort('dateOfBirth')}
                className="flex items-center space-x-1 hover:text-secondary-700"
              >
                <span>Age</span>
                {sortField === 'dateOfBirth' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => handleSort('gender')}
                className="flex items-center space-x-1 hover:text-secondary-700"
              >
                <span>Gender</span>
                {sortField === 'gender' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
            </TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>
              <button
                onClick={() => handleSort('updatedAt')}
                className="flex items-center space-x-1 hover:text-secondary-700"
              >
                <span>Last Updated</span>
                {sortField === 'updatedAt' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPatients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <div className="flex flex-col">
                  <button
                    onClick={() => navigate(`/patients/${patient.id}`)}
                    className="text-left font-medium text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    {patient.firstName} {patient.lastName}
                  </button>
                  <span className="text-xs text-secondary-500">
                    ID: {patient.id.slice(0, 8)}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">
                    {calculateAge(new Date(patient.dateOfBirth))} years
                  </span>
                  <span className="text-xs text-secondary-500">
                    {formatDate(new Date(patient.dateOfBirth))}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getGenderBadgeVariant(patient.gender)}>
                  {patient.gender}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm">{patient.phone}</span>
                  {patient.email && (
                    <span className="text-xs text-secondary-500">{patient.email}</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {formatDate(new Date(patient.updatedAt))}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/patients/${patient.id}`)}
                  >
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(patient)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(patient)}
                    className="text-danger-600 hover:text-danger-700 hover:bg-danger-50"
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Made with Bob
