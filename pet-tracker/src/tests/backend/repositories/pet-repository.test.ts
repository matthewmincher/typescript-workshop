import pets from "../../../api/data/pets";
import {Species} from "../../../api/types/enums";
import PetRepository from "../../../api/repositories/pet-repository";
import {Pet} from "../../../api/types/pets";

describe('PetRepository', () => {
    let petRepository: PetRepository

    beforeEach(() => {
        // Clear the "data" before every test.
        pets.splice(0, pets.length)
        petRepository = new PetRepository()
    })

    it('returns all pets', async () => {
        const daveTheDog: Pet = {
            id: 1,
            name: 'Dave',
            species: Species.Dog,
        }
        const spudTheCat: Pet = {
            id: 2,
            name: 'Spud',
            species: Species.Cat,
        }
        pets.push(daveTheDog, spudTheCat)

        const actual = await petRepository.findAll()

        expect(actual).toHaveLength(2)

        expect(actual).toContain(daveTheDog)
        expect(actual).toContain(spudTheCat)
    })

    it('can find a pet', async () => {
        const daveTheDog: Pet = {
            id: 1,
            name: 'Dave',
            species: Species.Dog,
        }
        pets.push(daveTheDog)

        const actual = await petRepository.find(daveTheDog.id)

        expect(actual).not.toBeUndefined()
        expect(actual?.id).toEqual(daveTheDog.id)
        expect(actual?.name).toEqual(daveTheDog.name)
        expect(actual?.species).toEqual(daveTheDog.species)
    })

    it('can create a pet', async () => {
        const terryTheTortoise = {
            name: 'Terry',
            species: Species.Tortoise,
        }

        const actual = await petRepository.create(terryTheTortoise)
        expect(actual.name).toEqual(terryTheTortoise.name)
        expect(actual.species).toEqual(terryTheTortoise.species)

        const allPets = await petRepository.findAll()
        expect(allPets).toHaveLength(1)
        expect(allPets[0].name).toEqual(terryTheTortoise.name)
    })

    it('can delete a pet', async () => {
        const daveTheDog: Pet = {
            id: 1,
            name: 'Dave',
            species: Species.Dog,
        }
        pets.push(daveTheDog)

        await petRepository.delete(daveTheDog.id)

        expect(pets).toHaveLength(0)

        const actual = await petRepository.find(daveTheDog.id)
        expect(actual).toBeUndefined()
    });

    test('returns false if id pet can not be found', async () => {
        const daveTheDog: Pet = {
            id: 1,
            name: 'Dave',
            species: Species.Dog,
        }
        pets.push(daveTheDog)

        const actual = await petRepository.delete(5)

        expect(actual).toBeFalsy()
    });
})
