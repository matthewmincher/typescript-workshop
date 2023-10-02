/**
 * Band 1 (1st digit): 0-9
 * Band 2 (2nd digit): 0-9
 *
 * Band 3 (multiplier)
 */

export type ResistorInput = [
  ResistorColour,
  ResistorColour,
  ResistorColour
];

export const enum ResistorColour {
  Black = "black",
  Brown = "brown",
  Red = "red",
  Orange = "orange",
  Yellow = "yellow",
  Green = "green",
  Blue = "blue",
  Violet = "violet",
  Grey = "grey",
  White = "white",
  Gold = "gold",
  Silver = "silver",
}

const digitMap: Partial<Record<ResistorColour, number>> = {
  [ResistorColour.Black]: 0,
  [ResistorColour.Brown]: 1,
  [ResistorColour.Red]: 2,
  [ResistorColour.Orange]: 3,
  [ResistorColour.Yellow]: 4,
  [ResistorColour.Green]: 5,
  [ResistorColour.Blue]: 6,
  [ResistorColour.Violet]: 7,
  [ResistorColour.Grey]: 8,
  [ResistorColour.White]: 9,
};

const multiplierMap: Partial<Record<ResistorColour, number>> = {
  [ResistorColour.Black]: 1,
  [ResistorColour.Brown]: 10,
  [ResistorColour.Red]: 100,
  [ResistorColour.Orange]: 1_000,
  [ResistorColour.Yellow]: 10_000,
  [ResistorColour.Green]: 100_000,
  [ResistorColour.Blue]: 1_000_000,
  [ResistorColour.Violet]: 10_000_000,
  [ResistorColour.Grey]: 100_000_000,
  [ResistorColour.Gold]: 0.1,
  [ResistorColour.Silver]: 0.01,
};

export function calculateResistorValue(bands: ResistorInput): number {
    return 0;
}
