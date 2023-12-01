import PetRepository from "../../../api/repositories/pet-repository";
import PetService from "../../../api/services/pet-service";
import {Pet} from "../../../api/types/pets";
import {Species} from "../../../api/types/enums";

describe('PetService', () => {
    const petService = new PetService()

    const spy = jest.spyOn(PetRepository.prototype, 'findAll')

    afterEach(() => {
        spy.mockClear()
        // vs
        spy.mockReset()
        // vs
        spy.mockRestore()
    })

    it.todo('gets all the pets', async () => {

    })

    it.todo('gets a single pet', async () => {

    })

    it.todo('returns undefined if the pet cannot be found', async () => {

    })
})
