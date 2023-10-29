/**
 * #1 - Replace the uknown types with type declarations so that Typescript can compile
 * #2 - Replace the "in" check with a type guard (https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
 * npx ts-node ./src/getting-to-grips/animals-2.ts
 */

interface WildAnimal {
  species: string;
  age: number;
  habitat: string;
}

interface DomesticAnimal {
  name: string;
  species: string;
  age: number;
  owner: {
    name: string;
  };
}

type Animal = unknown;

const animals: unknown[] = [
  {
    name: "Spud",
    species: "Cat",
    age: 8,
    owner: {
      name: "Matt",
    },
  },
  {
    species: "Bat",
    age: 1,
    habitat: "Dark cave",
  },
];

animals.forEach((animal, i) => {
  let message: string;

  if ("owner" in animal) {
    console.log(
      `Domestic animal at ${i} - ${animal.age} yr old ${animal.species} belonging to ${animal.owner.name}`
    );
  } else {
    console.log(
      `Wild animal at ${i} - ${animal.age} yr old ${animal.species} living in the ${animal.habitat}`
    );
  }
});
