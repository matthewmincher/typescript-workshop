import { WeighablePet } from "@backend/types/Pet";

export function isWeighablePet(x: any): x is WeighablePet {
  return (x as WeighablePet).weighIns !== undefined;
}

export default class PetsApi {
  async getAllPets(): Promise<any[]> {
    return fetch("http://localhost:7000/api/pets").then((response) =>
      response.json()
    );
  }
}
