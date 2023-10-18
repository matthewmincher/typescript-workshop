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

  async delete(id: number): Promise<boolean> {
    return petRepository.delete(id);
  }
}
