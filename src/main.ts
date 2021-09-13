import Difficulty from "./block/difficulty";
import Blockchain from "./blockchain/blockchain";
import Address from "./transaction/address";
import Amount from "./transaction/amount";
import SigningKey from "./transaction/signing-key";
import Transaction from "./transaction/transaction";

const myKey = new SigningKey(
  "7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf"
);
const myAddress = new Address(myKey.publicKey);
const coin = new Blockchain(new Difficulty(2), new Amount(100));

coin.minePendingTransactions(myAddress);

const transaction1 = new Transaction(
  myAddress,
  new Address("address2"),
  new Amount(100)
);
transaction1.sign(myKey);
coin.addTransaction(transaction1);

coin.minePendingTransactions(myAddress);

const transaction2 = new Transaction(
  myAddress,
  new Address("address1"),
  new Amount(50)
);
transaction2.sign(myKey);
coin.addTransaction(transaction2);

coin.minePendingTransactions(myAddress);

console.log();
console.log(`Balance of Evan is ${coin.getBalanceOfAddress(myAddress)}`);

console.log();
console.log("Blockchain valid?", coin.isChainValid() ? "Yes" : "No");
