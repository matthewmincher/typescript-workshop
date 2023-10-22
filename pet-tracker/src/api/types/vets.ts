import { Address } from "./address";

export type Vet = {
  id: number;
  name: string;
  address: Address;
  phoneNumber: string;
};

export type Appointment = {
  id: number;
  vetId: number;
  petId: number;

  date: number;
  reason: string;
};
