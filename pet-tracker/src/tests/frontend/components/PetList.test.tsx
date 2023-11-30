import {act, render, screen} from '@testing-library/react';
import {Species} from "../../../api/types/enums";
import PetList from "../../../components/PetList";
import userEvent from "@testing-library/user-event";

describe('PetList', () => {
    const defaultPets = [
        {
            id: 1,
            name: 'Spud The Cat',
            species: Species.Cat,
            weight: {
                minimumWeight: 5,
                maximumWeight: 6.5,
                weighIns: [],
            },
        },
        {
            id: 2,
            name: 'Dave The Dog',
            species: Species.Dog,
            weight: {
                minimumWeight: 10,
                maximumWeight: 15.2,
                weighIns: [],
            },
        },
    ]
    const defaultSelectedPetId = 1
    const defaultOnSelectPet = () => {
    }
    const defaultOnUpdatePet = () => {
    }


    it('shows a list of pets', () => {
        render(
            <PetList
                pets={defaultPets}
                selectedPetId={defaultSelectedPetId}
                onSelectPet={defaultOnSelectPet}
                onUpdatePet={defaultOnUpdatePet}
            />
        )

        expect(screen.getByText(/Spud The Cat/i))
        expect(screen.getByText(/Dave The Dog/i))
    })

    it('shows the add pet modal', () => {
        render(
            <PetList
                pets={defaultPets}
                selectedPetId={defaultSelectedPetId}
                onSelectPet={defaultOnSelectPet}
                onUpdatePet={defaultOnUpdatePet}
            />
        )

        const newPetButton = screen.getByLabelText(/add/i)
        act(() => {
            userEvent.click(newPetButton)
        })

        expect(screen.getByText(/Add Pet/i))
    })
})
