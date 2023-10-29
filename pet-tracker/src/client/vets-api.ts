import { Vet } from "../api/types/vets";

export default class VetsApi {
  async getAllVets(): Promise<Vet[]> {
    return fetch("http://localhost:7000/api/vets").then((response) =>
      response.json()
    );
  }
}
