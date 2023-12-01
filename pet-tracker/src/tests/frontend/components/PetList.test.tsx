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


    it.todo('shows a list of pets', () => {

    })

    it.todo('shows the add pet modal', () => {

    })
})
