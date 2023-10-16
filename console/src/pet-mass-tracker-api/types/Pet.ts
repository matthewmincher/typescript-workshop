import { Species } from "./enums";

export interface Pet {
  name: string;
  species: Species;
  weight: number;
  id: number;
}
