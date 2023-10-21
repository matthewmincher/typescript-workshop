import format from "date-fns/format";
import { Pet } from "../api/types/Pet";

export default class PetsApi {
  async getAllPets(): Promise<any[]> {
    return fetch("http://localhost:7000/api/pets").then((response) =>
      response.json()
    );
  }

  async addWeightForPet(
    id: number,
    minimumWeight: number,
    maximumWeight: number,
    date: Date,
    weight: number
  ): Promise<Pet> {
    const postData = {
      minimumWeight,
      maximumWeight,
      weight,
      date: format(date, "y-MM-dd"),
    };

    return fetch(`http://localhost:7000/api/pets/${id}/weight`, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }
}
