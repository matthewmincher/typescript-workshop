import { vets, appointments } from "../data/vets";
import { Vet, Appointment } from "../types/vets";

export default class VetRepository {
  async findAll(): Promise<Vet[]> {
    return Object.values(vets);
  }

  async find(id: number): Promise<Vet | undefined> {
    return vets.find((vet) => vet.id === id);
  }

  async findAllAppointments(): Promise<Appointment[]> {
    return Object.values(appointments);
  }

  async findAppointment(id: number): Promise<Appointment | undefined> {
    return appointments.find((appointment) => appointment.id === id);
  }

  async makeAppointment(
    vetId: number,
    appointment: Omit<Appointment, "id" | "vetId">
  ): Promise<Appointment> {
    const id =
      Math.max(...appointments.map((appointment) => appointment.id)) + 1;

    const newAppointment: Appointment = {
      ...appointment,
      id: Math.max(id, 1),
      vetId: vetId,
    };

    appointments.push(newAppointment);

    return newAppointment;
  }

  async cancelAppointment(
    vetId: number,
    appointmentId: number
  ): Promise<boolean> {
    const index = appointments.findIndex(
      (appointment) =>
        appointment.id === appointmentId && appointment.vetId === vetId
    );

    if (index === -1) {
      return false;
    }

    appointments.splice(index, 1);

    return true;
  }
}
