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

export function calculateResistorValue(bands: ResistorInput): number {
  return 0
}
