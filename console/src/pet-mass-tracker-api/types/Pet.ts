import { Species } from "./enums";

export interface Pet {
  name: string;
  species: Species;
  weight: number;
  id: number;
}

type WeighIn = {
  date: number;
  weight: number;
};

export interface WeighablePet extends Pet {
  minimumWeight: number;
  maximumWeight: number;
  weighIns: WeighIn[];
}
