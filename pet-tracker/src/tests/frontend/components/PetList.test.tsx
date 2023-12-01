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


    /**
     * Render the PetList component, passing in the defaultPets array
     * Assert that both pets are present in the component
     */
    it('shows a list of pets', () => {
        render(<PetList pets={defaultPets} selectedPetId={defaultSelectedPetId} onSelectPet={defaultOnSelectPet} onUpdatePet={defaultOnUpdatePet} />)

        expect(screen.findByText(/Spud The Cat/i))
        expect(screen.findByText(/Dave The Dog/i))
    })

    /**
     * Render the PetList component, passing in the defaultPets array
     * Click the 'Add Pets' button
     * Assert that the modal is shown
     */
    it('shows the add pet modal',  () => {
        render(<PetList pets={defaultPets} selectedPetId={defaultSelectedPetId} onSelectPet={defaultOnSelectPet} onUpdatePet={defaultOnUpdatePet} />)

        const button = screen.getByLabelText(/add/i)

        act(() => {
            userEvent.click(button)
        })

        expect(screen.findByText(/Add Pet/i))
    })
})
