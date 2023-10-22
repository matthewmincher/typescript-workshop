import { Species } from "../types/enums";
import { Pet } from "../types/pets";
import { parse, getUnixTime } from "date-fns";

const date = Date.now();

let pets: Pet[] = [
  {
    id: 1,
    name: "Spud",
    species: Species.Cat,
    weight: {
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
  },
];

export default pets;
