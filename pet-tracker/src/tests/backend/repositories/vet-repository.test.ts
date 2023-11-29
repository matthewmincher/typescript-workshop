import VetRepository from "../../../api/repositories/vet-repository";
import {vets} from "../../../api/data/vets";

describe('VetRepository', () => {
    let vetRepository: VetRepository

    beforeEach(() => {
        vets.splice(0, vets.length)
        vetRepository = new VetRepository()
    })

    it('', async () => {

    })
})

class Calculator {
    add (int1: number, int2: number): number {
        return int1 + int2
    }
}


describe('Calculator', () => {
    it('adds two numbers together', () => {
        const myClass = new Calculator()
        const result = myClass.add(1, 2)
        expect(result).toEqual(3)
    })
})