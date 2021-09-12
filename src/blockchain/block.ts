import Difficulty from "./difficulty";
import BlockHash from "./block-hash";
import Nonce from "./nonce";
import Timestamp from "./timestamp";
import Transaction from "./transaction";
import IBlockHash from "./block-hash.interface";

interface BlockProps {
  hash: IBlockHash;
  nonce: Nonce;
  previousHash: string;
  transactions: Transaction[];
  timestamp: Timestamp;
}

export default class Block {
  private props: BlockProps;

  constructor(
    previousHash: string,
    transactions: Transaction[],
    timestamp: Timestamp
  ) {
    this.props = {
      hash: new BlockHash(),
      nonce: new Nonce(),
      previousHash,
      timestamp,
      transactions,
    };
  }

  get nonce() {
    return this.props.nonce;
  }

  get hash() {
    return this.props.hash.calculateHash(this);
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

  public mineBlock(difficulty: Difficulty) {
    while (!difficulty.isDifficulty(this.hash)) {
      this.nonce.increment();
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
