import { Pet } from "@backend/types/Pet";

export default class PetsApi {
  async getAllPets(): Promise<Pet[]> {
    return fetch("http://localhost:7000/api/pets").then((response) =>
      response.json()
    );
  }
}
