import { Species } from "./enums";

type WeighIn = {
  date: number;
  weight: number;
};

interface Weight {
  minimumWeight: number;
  maximumWeight: number;
  weighIns: WeighIn[];
}

export interface Pet {
  name: string;
  species: Species;
  id: number;

  weight?: Weight;
}

export interface UpdatedPet extends Pet {
  updatedAt: string
}
