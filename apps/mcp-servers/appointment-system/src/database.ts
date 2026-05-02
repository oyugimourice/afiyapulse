import { Appointment, AppointmentSlot, DoctorAvailability } from './types';

/**
 * In-memory appointment system database
 * In production, this would integrate with a real calendar/scheduling system
 */
export class AppointmentDatabase {
  private appointments: Map<string, Appointment> = new Map();
  private doctors: Map<string, DoctorAvailability> = new Map();
  private appointmentCounter = 1;

  constructor() {
    this.initializeDatabase();
  }

  /**
   * Initialize database with sample doctors and appointments
   */
  private initializeDatabase() {
    // Sample doctors with availability
    const doctor1: DoctorAvailability = {
      doctorId: 'doc-001',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Internal Medicine',
      workingHours: {
        start: '08:00',
        end: '17:00',
      },
      availableSlots: [],
    };

    const doctor2: DoctorAvailability = {
      doctorId: 'doc-002',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      workingHours: {
        start: '09:00',
        end: '16:00',
      },
      availableSlots: [],
    };

    const doctor3: DoctorAvailability = {
      doctorId: 'doc-003',
      doctorName: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      workingHours: {
        start: '08:30',
        end: '16:30',
      },
      availableSlots: [],
    };

    this.doctors.set(doctor1.doctorId, doctor1);
    this.doctors.set(doctor2.doctorId, doctor2);
    this.doctors.set(doctor3.doctorId, doctor3);

    // Sample existing appointments
    const appointment1: Appointment = {
      id: 'apt-001',
      patientId: 'patient-001',
      patientName: 'John Doe',
      doctorId: 'doc-001',
      doctorName: 'Dr. Sarah Johnson',
      type: 'FOLLOW_UP',
      scheduledAt: '2026-05-05T10:00:00Z',
      duration: 30,
      status: 'scheduled',
      reason: 'Diabetes follow-up',
      location: 'Clinic Room 101',
    };

    const appointment2: Appointment = {
      id: 'apt-002',
      patientId: 'patient-002',
      patientName: 'Jane Smith',
      doctorId: 'doc-002',
      doctorName: 'Dr. Michael Chen',
      type: 'SPECIALIST',
      scheduledAt: '2026-05-06T14:00:00Z',
      duration: 45,
      status: 'confirmed',
      reason: 'Cardiology consultation',
      location: 'Cardiology Department',
    };

    this.appointments.set(appointment1.id, appointment1);
    this.appointments.set(appointment2.id, appointment2);
  }

  /**
   * Check availability for a specific date
   */
  checkAvailability(
    date: string,
    doctorId?: string,
    specialty?: string,
    duration: number = 30
  ): DoctorAvailability[] {
    const availabilities: DoctorAvailability[] = [];

    // Filter doctors by criteria
    let doctors = Array.from(this.doctors.values());
    if (doctorId) {
      doctors = doctors.filter(d => d.doctorId === doctorId);
    }
    if (specialty) {
      doctors = doctors.filter(d => d.specialty?.toLowerCase().includes(specialty.toLowerCase()));
    }

    // Generate available slots for each doctor
    for (const doctor of doctors) {
      const slots = this.generateAvailableSlots(doctor, date, duration);
      availabilities.push({
        ...doctor,
        availableSlots: slots,
      });
    }

    return availabilities;
  }

  /**
   * Generate available time slots for a doctor on a specific date
   */
  private generateAvailableSlots(
    doctor: DoctorAvailability,
    date: string,
    duration: number
  ): AppointmentSlot[] {
    const slots: AppointmentSlot[] = [];
    const targetDate = new Date(date);
    
    // Parse working hours
    const [startHour, startMinute] = doctor.workingHours.start.split(':').map(Number);
    const [endHour, endMinute] = doctor.workingHours.end.split(':').map(Number);

    // Generate slots throughout the day
    let currentTime = new Date(targetDate);
    currentTime.setHours(startHour, startMinute, 0, 0);

    const endTime = new Date(targetDate);
    endTime.setHours(endHour, endMinute, 0, 0);

    let slotId = 1;
    while (currentTime < endTime) {
      const slotEnd = new Date(currentTime.getTime() + duration * 60000);
      
      if (slotEnd <= endTime) {
        const isAvailable = !this.isSlotBooked(
          doctor.doctorId,
          currentTime.toISOString(),
          slotEnd.toISOString()
        );

        slots.push({
          id: `slot-${doctor.doctorId}-${slotId++}`,
          doctorId: doctor.doctorId,
          doctorName: doctor.doctorName,
          specialty: doctor.specialty,
          startTime: currentTime.toISOString(),
          endTime: slotEnd.toISOString(),
          isAvailable,
          location: `Clinic Room ${Math.floor(Math.random() * 10) + 100}`,
        });
      }

      // Move to next slot (30-minute intervals)
      currentTime = new Date(currentTime.getTime() + 30 * 60000);
    }

    return slots;
  }

  /**
   * Check if a time slot is already booked
   */
  private isSlotBooked(doctorId: string, startTime: string, endTime: string): boolean {
    const start = new Date(startTime);
    const end = new Date(endTime);

    for (const appointment of this.appointments.values()) {
      if (appointment.doctorId !== doctorId) continue;
      if (appointment.status === 'cancelled') continue;

      const aptStart = new Date(appointment.scheduledAt);
      const aptEnd = new Date(aptStart.getTime() + appointment.duration * 60000);

      // Check for overlap
      if (start < aptEnd && end > aptStart) {
        return true;
      }
    }

    return false;
  }

  /**
   * Book an appointment
   */
  bookAppointment(params: {
    patientId: string;
    patientName: string;
    doctorId: string;
    scheduledAt: string;
    type: 'FOLLOW_UP' | 'LAB_WORK' | 'IMAGING' | 'SPECIALIST' | 'PROCEDURE';
    duration: number;
    reason?: string;
    notes?: string;
  }): Appointment {
    // Check if slot is available
    const endTime = new Date(new Date(params.scheduledAt).getTime() + params.duration * 60000);
    if (this.isSlotBooked(params.doctorId, params.scheduledAt, endTime.toISOString())) {
      throw new Error('Time slot is not available');
    }

    // Get doctor info
    const doctor = this.doctors.get(params.doctorId);
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    // Create appointment
    const appointmentId = `apt-${String(this.appointmentCounter++).padStart(3, '0')}`;
    const appointment: Appointment = {
      id: appointmentId,
      patientId: params.patientId,
      patientName: params.patientName,
      doctorId: params.doctorId,
      doctorName: doctor.doctorName,
      type: params.type,
      scheduledAt: params.scheduledAt,
      duration: params.duration,
      status: 'scheduled',
      reason: params.reason,
      notes: params.notes,
      location: `Clinic Room ${Math.floor(Math.random() * 10) + 100}`,
    };

    this.appointments.set(appointmentId, appointment);
    return appointment;
  }

  /**
   * Get appointment by ID
   */
  getAppointment(appointmentId: string): Appointment | null {
    return this.appointments.get(appointmentId) || null;
  }

  /**
   * Get patient appointments
   */
  getPatientAppointments(
    patientId: string,
    status?: string,
    fromDate?: string,
    limit: number = 10
  ): Appointment[] {
    let appointments = Array.from(this.appointments.values())
      .filter(apt => apt.patientId === patientId);

    if (status) {
      appointments = appointments.filter(apt => apt.status === status);
    }

    if (fromDate) {
      const fromDateTime = new Date(fromDate).getTime();
      appointments = appointments.filter(apt => 
        new Date(apt.scheduledAt).getTime() >= fromDateTime
      );
    }

    return appointments
      .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
      .slice(0, limit);
  }

  /**
   * Cancel appointment
   */
  cancelAppointment(appointmentId: string, reason?: string): Appointment {
    const appointment = this.appointments.get(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    appointment.status = 'cancelled';
    if (reason) {
      appointment.notes = `Cancellation reason: ${reason}${appointment.notes ? `\n\nOriginal notes: ${appointment.notes}` : ''}`;
    }

    return appointment;
  }

  /**
   * Reschedule appointment
   */
  rescheduleAppointment(
    appointmentId: string,
    newScheduledAt: string,
    reason?: string
  ): Appointment {
    const appointment = this.appointments.get(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    // Check if new slot is available
    const endTime = new Date(new Date(newScheduledAt).getTime() + appointment.duration * 60000);
    if (this.isSlotBooked(appointment.doctorId, newScheduledAt, endTime.toISOString())) {
      throw new Error('New time slot is not available');
    }

    const oldTime = appointment.scheduledAt;
    appointment.scheduledAt = newScheduledAt;
    
    if (reason) {
      appointment.notes = `Rescheduled from ${oldTime}. Reason: ${reason}${appointment.notes ? `\n\nOriginal notes: ${appointment.notes}` : ''}`;
    }

    return appointment;
  }

  /**
   * Get all doctors
   */
  getDoctors(): DoctorAvailability[] {
    return Array.from(this.doctors.values());
  }
}

// Singleton instance
export const appointmentDatabase = new AppointmentDatabase();

// Made with Bob