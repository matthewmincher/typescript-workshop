import { getUnixTime } from "date-fns";
import PetRepository from "../repositories/pet-repository";
import { Pet } from "../types/Pet";

const petRepository = new PetRepository();
export default class PetService {
  async all(): Promise<Pet[]> {
    return petRepository.findAll();
  }

  async find(id: number): Promise<Pet | undefined> {
    return petRepository.find(id);
  }

  async create(pet: Omit<Pet, "id">): Promise<Pet> {
    return petRepository.create(pet);
  }

  async update(pet: Pet): Promise<Pet> {
    return petRepository.update(pet);
  }

  async addWeight(
    id: number,
    minimumWeight: number,
    maximumWeight: number,
    date: Date,
    weight: number
  ): Promise<Pet> {
    const pet = await this.find(id);

    if (!pet) {
      throw Error(`Pet not found for ID ${id}`);
    }

    const updatedPet: Pet = {
      ...pet,
      weight: {
        minimumWeight,
        maximumWeight,
        weighIns: [
          ...pet.weight.weighIns,
          {
            weight: weight,
            date: getUnixTime(date),
          },
        ],
      },
    };

    updatedPet.weight.weighIns.sort((a, b) => {
      return a.date - b.date;
    });

    return this.update(updatedPet);
  }

  async delete(id: number): Promise<boolean> {
    return petRepository.delete(id);
  }
}
