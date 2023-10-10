/**
 * Add a StaffMember type and replace all of the unknown types in this file.
 * npx ts-node ./src/getting-to-grips/users.ts
 */

const staff: unknown = [
  {
    username: "maurice.moss",
    age: 28,
    title: "Software application developer",
    hobbies: ["Countdown"],
    emailAddress: undefined,
  },
  {
    username: "jen.barber",
    age: 23,
    title: "Relationships Manager",
    hobbies: ["Guitar Hero"],
    emailAddress: "barberj@reynholm.ind",
  },
  {
    username: "roy.trenneman",
    age: 22,
    title: "Head of IT",
    hobbies: ["Comic Books", "Board Games"],
    emailAddress: "trennemanr@reynholm.ind",
  },
];

function logStaffMember(staffMember: unknown): void {
  console.log(
    `Staff member "${staffMember.username} is ${
      staffMember.age
    } years old and works as ${staffMember.title}. Their email address is ${
      staffMember.emailAddress ?? "unknown"
    }. They enjoy ${staffMember.hobbies.join(", ")}"`
  );
}
staff.forEach(logStaffMember);
