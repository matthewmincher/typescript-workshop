import { Appointment, Vet } from "../types/vets";
import { parseISO, getUnixTime } from "date-fns";

export let vets: Vet[] = [
  {
    id: 1,
    name: "Chester Vets4Pets",
    phoneNumber: "01244400273",
    address: {
      line1: "35 Brook Ln",
      line2: "Newton",
      line3: "Chester",
      postcode: "CH2 2EB",
      country: "United Kingdom",
    },
  },
  {
    id: 2,
    name: "Flookersbrook Veterinary Surgery",
    phoneNumber: "01244313311",
    address: {
      line1: "2 Ermine Rd",
      line2: "Chester",
      postcode: "CH2 3PL",
      country: "United Kingdom",
    },
  },
];

export let appointments: Appointment[] = [
  {
    id: 1,
    vetId: 1,
    petId: 1,
    date: getUnixTime(parseISO("2023-10-10T10:00:00Z")),
    reason: "Vaccinations & annual health check",
  },
  {
    id: 2,
    vetId: 2,
    petId: 1,
    date: getUnixTime(parseISO("2023-11-20T16:30:00Z")),
    reason: "Weight check in",
  },
];
