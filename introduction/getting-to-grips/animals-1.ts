/**
 * Define a type for a pet and replace the umknowns in this file
 * npx ts-node ./getting-to-grips/animals-1.ts
 */

export type Animal = unknown;

export const animals: unknown[] = [
  {
    name: "Spud",
    age: 8,
    species: "Cat",
  },
  {
    name: "Fred",
    age: 27,
    species: "Tortoise",
  },
];

animals.forEach((animal, i) => {
  console.log(
    `Animal at ${i}: ${animal.name} - ${animal.age} yr old ${animal.species}`
  );
});
