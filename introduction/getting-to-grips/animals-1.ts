/**
 * Define a type for a pet and replace the umknowns in this file
 * npx ts-node getting-to-grips/pets-1.ts
 */

export type Pet = unknown;

export const pets: unknown[] = [
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

pets.forEach((pet, i) => {
  console.log(`Pet at ${i}: ${pet.name} - ${pet.age} yr old ${pet.species}`);
});
