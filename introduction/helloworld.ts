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
