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
    it.todo('shows a list of pets', () => {

    })

    /**
     * Render the PetList component, passing in the defaultPets array
     * Click the 'Add Pets' button
     * Assert that the modal is shown
     */
    it.todo('shows the add pet modal', () => {

    })
})
