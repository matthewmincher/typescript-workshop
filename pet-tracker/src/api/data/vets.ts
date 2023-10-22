import { Appointment, Vet } from "../types/vets";
import { parse, getUnixTime } from "date-fns";

const date = Date.now();

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
    date: getUnixTime(parse("2023-10-10", "y-MM-dd", date)),
    reason: "Vaccinations & annual health check",
  },
];
