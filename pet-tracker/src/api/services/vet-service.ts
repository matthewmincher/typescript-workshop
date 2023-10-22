import { getUnixTime } from "date-fns";
import VetRepository from "../repositories/vet-repository";
import { Appointment, Vet } from "../types/vets";

const vetRepository = new VetRepository();
export default class VetService {
  async all(): Promise<Vet[]> {
    return vetRepository.findAll();
  }

  async find(id: number): Promise<Vet | undefined> {
    return vetRepository.find(id);
  }

  async appointments(id: number): Promise<Appointment[]> {
    return vetRepository
      .findAllAppointments()
      .then((appointments) =>
        appointments.filter((appointment) => appointment.vetId === id)
      );
  }

  async makeAppointment(
    vetId: number,
    petId: number,
    date: Date,
    reason: string
  ): Promise<Appointment> {
    return vetRepository.makeAppointment(vetId, {
      petId,
      reason,
      date: getUnixTime(date),
    });
  }

  async cancelAppointment(
    vetId: number,
    appointmentId: number
  ): Promise<boolean> {
    return vetRepository.cancelAppointment(vetId, appointmentId);
  }
}
