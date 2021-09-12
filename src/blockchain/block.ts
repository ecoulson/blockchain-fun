import SHA256Strategy from "../hash/sha-256-strategy";
import Difficulty from "./difficulty";
import Nonce from "./nonce";
import Timestamp from "./timestamp";
import Transaction from "./transaction";

interface BlockProps {
  nonce: Nonce;
  previousHash: string;
  transactions: Transaction[];
  timestamp: Timestamp;
}

export default class Block {
  private hashingStrategy: SHA256Strategy;
  private cachedHash: string;
  private props: BlockProps;

  constructor(
    previousHash: string,
    transactions: Transaction[],
    timestamp: Timestamp
  ) {
    this.props = {
      nonce: new Nonce(),
      previousHash,
      timestamp,
      transactions,
    };
    this.hashingStrategy = new SHA256Strategy();
    this.cachedHash = this.hashingStrategy.hash(this.serialize());
  }

  get nonce() {
    return this.props.nonce;
  }

  get hash() {
    return this.cachedHash;
  }

  get transactions() {
    return this.props.transactions;
  }

  get previousHash() {
    return this.props.previousHash;
  }

  get timestamp() {
    return this.props.timestamp;
  }

  private updateHash() {
    this.cachedHash = this.hashingStrategy.hash(this.serialize());
  }

  public serialize(): string {
    return (
      this.nonce.value +
      this.hash +
      JSON.stringify(this.transactions) +
      this.previousHash +
      this.timestamp.value
    );
  }

  public mineBlock(difficulty: Difficulty) {
    while (!difficulty.isDifficulty(this.hash)) {
      this.nonce.increment();
      this.updateHash();
    }
  }

  public hasValidTransaction() {
    return this.transactions.reduce<boolean>(
      this.checkIfTransactionIsValid,
      true
    );
  }

  private checkIfTransactionIsValid(
    isValid: boolean,
    transaction: Transaction
  ) {
    return isValid && transaction.isValid();
  }
}
