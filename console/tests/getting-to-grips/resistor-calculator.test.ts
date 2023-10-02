import { ResistorInput, calculateResistorValue as SUT } from "../../src/getting-to-grips/resistor-calculator"


test.each([
    {
        bands: ["red", "violet", "yellow"],
        resistance: 270000
    },
    {
        bands: ["yellow", "violet", "orange"],
        resistance: 47000
    },
    {
        bands: ["brown", "black", "black"],
        resistance: 10
    },
    {
        bands: ["brown", "black", "gold"],
        resistance: 1
    },
])('returns resistance of $resistance for bands $bands ', ({ bands, resistance }) => {
    const actual = SUT(bands as ResistorInput)

    expect(actual).toEqual(resistance)
})