import pets from "../data/pets";
import { Pet } from "../types/Pet";

export default class PetRepository {
  async findAll(): Promise<Pet[]> {
    return Object.values(pets);
  }

  async find(id: number): Promise<Pet | undefined> {
    return pets.find((pet) => pet.id === id);
  }

  async create(pet: Omit<Pet, "id">): Promise<Pet> {
    const id = Math.max(...pets.map((pet) => pet.id)) + 1;
    const newPet = {
      ...pet,
      id,
    };

    pets.push(newPet);

    return newPet;
  }

  async delete(id: number): Promise<boolean> {
    const index = pets.findIndex((pet) => pet.id === id);

    if (index === -1) {
      return false;
    }

    pets.splice(index, 1);

    return true;
  }
}
