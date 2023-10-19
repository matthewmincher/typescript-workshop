import { Species } from "../types/enums";
import { Pet, WeighablePet } from "../types/Pet";
import { parse, getUnixTime } from "date-fns";

const date = Date.now();

let pets: (Pet | WeighablePet)[] = [
  {
    id: 1,
    name: "Spud",
    species: Species.Cat,
    weight: 7.1,
    minimumWeight: 5,
    maximumWeight: 6.5,
    weighIns: [
      {
        date: getUnixTime(parse("2023-09-10", "y-MM-dd", date)),
        weight: 6.915,
      },
      {
        date: getUnixTime(parse("2023-09-24", "y-MM-dd", date)),
        weight: 7.0,
      },
      {
        date: getUnixTime(parse("2023-10-10", "y-MM-dd", date)),
        weight: 6.8,
      },
    ],
  },
];

export default pets;
