/**
 * Add types to these classes.
 * npx ts-node ./src/getting-to-grips/convert-me.ts
 */

class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`Deposited ${amount}. Total balance: ${this.balance}`);
  }

  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrew ${amount}. Total balance: ${this.balance}`);
    } else {
      console.log("Insufficient funds");
    }
  }
}

class Customer {
  constructor(name, account) {
    this.name = name;
    this.account = account;
  }

  performTransaction(type, amount) {
    if (type === "deposit") {
      this.account.deposit(amount);
    } else if (type === "withdraw") {
      this.account.withdraw(amount);
    } else {
      console.log("Invalid transaction type");
    }
  }
}

const account = new BankAccount(1000);
const customer = new Customer("John Doe", account);
customer.performTransaction("deposit", 200);
customer.performTransaction("withdraw", 150);
