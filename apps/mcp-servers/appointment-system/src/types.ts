import { z } from 'zod';

/**
 * Appointment slot schema
 */
export const AppointmentSlotSchema = z.object({
  id: z.string(),
  doctorId: z.string(),
  doctorName: z.string(),
  specialty: z.string().optional(),
  startTime: z.string(),
  endTime: z.string(),
  isAvailable: z.boolean(),
  location: z.string().optional(),
});

export type AppointmentSlot = z.infer<typeof AppointmentSlotSchema>;

/**
 * Appointment schema
 */
export const AppointmentSchema = z.object({
  id: z.string(),
  patientId: z.string(),
  patientName: z.string(),
  doctorId: z.string(),
  doctorName: z.string(),
  type: z.enum(['FOLLOW_UP', 'LAB_WORK', 'IMAGING', 'SPECIALIST', 'PROCEDURE']),
  scheduledAt: z.string(),
  duration: z.number(),
  status: z.enum(['scheduled', 'confirmed', 'cancelled', 'completed', 'no-show']),
  reason: z.string().optional(),
  notes: z.string().optional(),
  location: z.string().optional(),
});

export type Appointment = z.infer<typeof AppointmentSchema>;

/**
 * Doctor availability schema
 */
export const DoctorAvailabilitySchema = z.object({
  doctorId: z.string(),
  doctorName: z.string(),
  specialty: z.string().optional(),
  availableSlots: z.array(AppointmentSlotSchema),
  workingHours: z.object({
    start: z.string(),
    end: z.string(),
  }),
});

export type DoctorAvailability = z.infer<typeof DoctorAvailabilitySchema>;

/**
 * Tool parameter schemas
 */
export const CheckAvailabilityParamsSchema = z.object({
  doctorId: z.string().optional(),
  specialty: z.string().optional(),
  date: z.string(),
  duration: z.number().optional().default(30),
});

export type CheckAvailabilityParams = z.infer<typeof CheckAvailabilityParamsSchema>;

export const BookAppointmentParamsSchema = z.object({
  patientId: z.string(),
  patientName: z.string(),
  doctorId: z.string(),
  scheduledAt: z.string(),
  type: z.enum(['FOLLOW_UP', 'LAB_WORK', 'IMAGING', 'SPECIALIST', 'PROCEDURE']),
  duration: z.number().optional().default(30),
  reason: z.string().optional(),
  notes: z.string().optional(),
});

export type BookAppointmentParams = z.infer<typeof BookAppointmentParamsSchema>;

export const GetAppointmentParamsSchema = z.object({
  appointmentId: z.string(),
});

export type GetAppointmentParams = z.infer<typeof GetAppointmentParamsSchema>;

export const GetPatientAppointmentsParamsSchema = z.object({
  patientId: z.string(),
  status: z.enum(['scheduled', 'confirmed', 'cancelled', 'completed', 'no-show']).optional(),
  fromDate: z.string().optional(),
  limit: z.number().optional().default(10),
});

export type GetPatientAppointmentsParams = z.infer<typeof GetPatientAppointmentsParamsSchema>;

export const CancelAppointmentParamsSchema = z.object({
  appointmentId: z.string(),
  reason: z.string().optional(),
});

export type CancelAppointmentParams = z.infer<typeof CancelAppointmentParamsSchema>;

export const RescheduleAppointmentParamsSchema = z.object({
  appointmentId: z.string(),
  newScheduledAt: z.string(),
  reason: z.string().optional(),
});

export type RescheduleAppointmentParams = z.infer<typeof RescheduleAppointmentParamsSchema>;

// Made with Bob