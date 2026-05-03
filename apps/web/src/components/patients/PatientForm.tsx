import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { CreatePatientData, Patient } from '@/services/patient.service';

const patientSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().optional(),
  medicalHistory: z.string().optional(),
  allergies: z.string().optional(),
  currentMedications: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insuranceNumber: z.string().optional(),
});

type PatientFormData = z.infer<typeof patientSchema>;

interface PatientFormProps {
  patient?: Patient;
  onSubmit: (data: CreatePatientData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function PatientForm({
  patient,
  onSubmit,
  onCancel,
  isLoading = false,
}: PatientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: patient
      ? {
          ...patient,
          dateOfBirth: new Date(patient.dateOfBirth).toISOString().split('T')[0],
        }
      : {
          gender: 'MALE',
        },
  });

  const handleFormSubmit = async (data: PatientFormData) => {
    await onSubmit(data as CreatePatientData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            {...register('firstName')}
            error={errors.firstName?.message}
            required
            fullWidth
          />
          
          <Input
            label="Last Name"
            {...register('lastName')}
            error={errors.lastName?.message}
            required
            fullWidth
          />
          
          <Input
            label="Date of Birth"
            type="date"
            {...register('dateOfBirth')}
            error={errors.dateOfBirth?.message}
            required
            fullWidth
          />
          
          <Select
            label="Gender"
            {...register('gender')}
            error={errors.gender?.message}
            required
            fullWidth
            options={[
              { value: 'MALE', label: 'Male' },
              { value: 'FEMALE', label: 'Female' },
              { value: 'OTHER', label: 'Other' },
            ]}
          />
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            fullWidth
          />
          
          <Input
            label="Phone"
            type="tel"
            {...register('phone')}
            error={errors.phone?.message}
            required
            fullWidth
          />
          
          <div className="md:col-span-2">
            <Textarea
              label="Address"
              {...register('address')}
              error={errors.address?.message}
              rows={2}
              fullWidth
            />
          </div>
        </div>
      </div>

      {/* Medical Information */}
      <div>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">
          Medical Information
        </h3>
        <div className="space-y-4">
          <Textarea
            label="Medical History"
            {...register('medicalHistory')}
            error={errors.medicalHistory?.message}
            rows={3}
            helperText="Previous conditions, surgeries, etc."
            fullWidth
          />
          
          <Textarea
            label="Allergies"
            {...register('allergies')}
            error={errors.allergies?.message}
            rows={2}
            helperText="Known allergies to medications, foods, etc."
            fullWidth
          />
          
          <Textarea
            label="Current Medications"
            {...register('currentMedications')}
            error={errors.currentMedications?.message}
            rows={2}
            helperText="List of current medications"
            fullWidth
          />
        </div>
      </div>

      {/* Emergency Contact */}
      <div>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">
          Emergency Contact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Emergency Contact Name"
            {...register('emergencyContact')}
            error={errors.emergencyContact?.message}
            fullWidth
          />
          
          <Input
            label="Emergency Contact Phone"
            type="tel"
            {...register('emergencyPhone')}
            error={errors.emergencyPhone?.message}
            fullWidth
          />
        </div>
      </div>

      {/* Insurance Information */}
      <div>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">
          Insurance Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Insurance Provider"
            {...register('insuranceProvider')}
            error={errors.insuranceProvider?.message}
            fullWidth
          />
          
          <Input
            label="Insurance Number"
            {...register('insuranceNumber')}
            error={errors.insuranceNumber?.message}
            fullWidth
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-4 border-t border-secondary-200">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
        >
          {patient ? 'Update Patient' : 'Create Patient'}
        </Button>
      </div>
    </form>
  );
}

// Made with Bob
