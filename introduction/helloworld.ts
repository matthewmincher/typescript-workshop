class HelloWorld {
  public sayHello(): void {
    console.log("Hello World!");
  }
}

const greeter = new HelloWorld();
greeter.sayHello();

interface Animal {
  name: string;
}

interface Social {
  friends: string[];
}

interface Bear extends Animal {
  hasHoney: boolean;
}

interface Bear extends Social {
  hibernationWeight: number;
}

const bear: Bear = {
  name: "Winnie-the-Pooh",
  hasHoney: false,
  friends: ["Eeyore", "Tigger"],
  hibernationWeight: 50,
};
