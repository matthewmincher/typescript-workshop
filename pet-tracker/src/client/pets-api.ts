import format from "date-fns/format";
import { Pet } from "../api/types/pets";
import { Appointment } from "../api/types/vets";

export default class PetsApi {
  async getAllPets(): Promise<any[]> {
    return fetch("http://localhost:7000/api/pets").then((response) =>
      response.json()
    );
  }

  async addPet(name: string, species: string): Promise<Pet> {
    const postData = {
      name,
      species,
    };

    return fetch(`http://localhost:7000/api/pets`, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
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

  async removePet(id: number): Promise<Response> {
    return fetch(`http://localhost:7000/api/pets/${id}`, {
      method: "DELETE",
    });
  }

  async getAppointments(petId: number): Promise<Appointment[]> {
    return fetch(`http://localhost:7000/api/pets/${petId}/appointments`).then(
      (response) => response.json()
    );
  }
}
