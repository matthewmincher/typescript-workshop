let numberOfLights: number = 4;
let feedback: string =
  "It looks ok on my screen. We don't need a backup, it never goes down! Can you lower the price for the website? Make it high quality and please use html";
let isFriday: boolean = true;
let lotteryNumbers: number[] = [1, 8, 14, 20, 24, 40, 52];

lotteryNumbers.forEach((number, index) =>
  console.log(`Lottery number at ${index} is ${number}`)
);

let widgets: HTMLElement[] = [];
widgets.forEach((element) =>
  console.log(`HTML element with ID: ${element.id}`)
);

type ResultError = [code: number, message: string];
function handleError(error: ResultError): void {
  const [code, message] = error;

  console.log(`Received error #${code}: ${message}`);
}

enum UserLevel {
  Admin,
  User,
  Guest = 999,
}

type UserTuple = [id: number, name: string, level: UserLevel];
let user: UserTuple = [45, "Matt", UserLevel.Admin];

let loosleyTypedThing: any = "sweetalertlib";
loosleyTypedThing.show("Message string to legacy JS lib");

let userInput: unknown;
if (typeof userInput === "string") {
  const asString: string = userInput;
  //const asBoolean: boolean = userInput;

  console.log(`User input is a string of length ${asString.length}`);
} else if (typeof userInput === "boolean") {
  //const asString: string = userInput;
  const asBoolean: boolean = userInput;

  console.log(
    `User input is a boolean of value: ${asBoolean ? "TRUE" : "FALSE"}`
  );
}

let developersName: string | undefined;
const nameLength = developersName?.length;

function doSomething(): void {
  console.log(
    "Logging to the console, I don't have any meaningful return value"
  );
}

function pollForever(): never {
  while (true) {}
}

const enum ImageSize {
  Thumbnail = "tiny",
  Small = "small",
  Medium = "medium",
  Large = "large",
}

console.log(ImageSize.Thumbnail);

type User = {
  id: number;
  name: string;
  level: UserLevel;

  bio?: string;
};

const authenticatedUser: User = {
  id: 5,
  name: "Matt",
  level: UserLevel.Admin,
};

console.log(
  `${authenticatedUser.name} is signed in. Their bio is: ${
    authenticatedUser.bio ?? "Missing!"
  }`
);

interface Animal {
  name: string;
}

interface SocialAnimal {
  friends: string[];
}

interface Bear extends Animal {
  hasHoney: boolean;
}

interface Bear extends SocialAnimal {
  hibernationWeight: number;
}

const bear: Bear = {
  name: "Winnie-the-Pooh",
  hasHoney: false,
  friends: ["Eeyore", "Tigger"],
  hibernationWeight: 50,
};

type NetworkLoadingState = {
  state: "loading";
};
type NetworkFailedState = {
  state: "failed";
  code: number;
};
type NetworkSuccessState = {
  state: "success";
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};

type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState;

function logger(state: NetworkState): string {
  switch (state.state) {
    case "loading":
      return "Downloading...";
    case "failed":
      return `Error ${state.code} downloading`;
    case "success":
      return `Downloaded ${state.response.title} - ${state.response.summary}`;
  }
}

interface Point {
  x: number;
  y: number;
}

interface Named {
  name: string;
}

type NamedPoint = Point & Named;

function displayPointOfInterest(point: Point & Named): void {
  console.log(`${point.name} is at ${point.x},${point.y}`);
}

type ApiResponse<T> = {
  success: boolean;
  code: number;
  payload: T | null;
};

type ApiBooking = {
  id: number;
  pbn: string;
};

async function fetchFromApi<T>(
  path: string,
  page: number
): Promise<ApiResponse<T>> {
  return {
    success: true,
    code: 200,
    payload: [] as T,
  };
}

fetchFromApi<ApiBooking[]>("bookings/1234", 1).then((response) => {
  response.payload?.forEach((booking) => {
    console.log(`Recieved booking with PBN ${booking.pbn}`);
  });
});
