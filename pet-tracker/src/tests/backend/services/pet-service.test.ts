import PetRepository from "../../../api/repositories/pet-repository";
import PetService from "../../../api/services/pet-service";
import {Pet} from "../../../api/types/pets";
import {Species} from "../../../api/types/enums";

describe('PetService', () => {
    const petService = new PetService()

    const findAllSpy = jest.spyOn(PetRepository.prototype, 'findAll')
    const findSpy = jest.spyOn(PetRepository.prototype, 'find')

    afterEach(() => {
        findAllSpy.mockReset()
        findSpy.mockReset()
    })

    it('gets all the pets', async () => {
        const pets: Pet[] = [{ id: 1, name: 'hello', species: Species.Cat }]
        findAllSpy.mockResolvedValueOnce(pets)

        const actual = await petService.all()

        expect(actual).toEqual(pets)
    })

    it('gets a single pet', async () => {
        const pet: Pet = { id: 1, name: 'hello', species: Species.Cat }
        findSpy.mockResolvedValueOnce(pet)

        const actual = await petService.find(1)

        expect(actual).toEqual(pet)
    })

    it('returns undefined if the pet cannot be found', async () => {
        findSpy.mockResolvedValueOnce(undefined)

        const actual = await petService.find(1)

        expect(actual).toBeUndefined()
    })
})
