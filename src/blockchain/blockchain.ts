import Block from "../block/block";
import Difficulty from "../block/difficulty";
import NullBlockHash from "../block/null-block-hash";
import Timestamp from "../common/timestamp";
import Address from "../transaction/address";
import Amount from "../transaction/amount";
import Transaction from "../transaction/transaction";

export default class Blockchain {
  public readonly chain: Block[];
  private pendingTransactions: Transaction[];
  private difficulty: Difficulty;
  private reward: Amount;

  constructor(difficulty: Difficulty, reward: Amount) {
    this.chain = [this.createGenisisBlock()];
    this.pendingTransactions = [];
    this.difficulty = difficulty;
    this.reward = reward;
  }

  private createGenisisBlock() {
    return new Block(
      NullBlockHash.Hash,
      [],
      new Timestamp(new Date("2017-01-01"))
    );
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miner: Address) {
    const reward: Transaction = new Transaction(
      new Address(),
      miner,
      this.reward
    );
    this.pendingTransactions.push(reward);

    const block = new Block(
      this.getLatestBlock().hash,
      this.pendingTransactions,
      new Timestamp()
    );
    block.mineBlock(this.difficulty);

    console.log("Block successfully mined!");
    this.chain.push(block);

    this.pendingTransactions = [];
  }

  addTransaction(transaction: Transaction) {
    if (!transaction.isValid()) {
      throw new Error("Can not add invalid transaction");
    }
    if (this.transactionSenderHasEnoughBalance(transaction)) {
      throw new Error("Not enough balance");
    }

    this.pendingTransactions.push(transaction);
    console.log("Transaction added", transaction);
  }

  private transactionSenderHasEnoughBalance({
    fromAddress: from,
    transactionAmount: amount,
  }: Transaction) {
    return this.getBalanceOfAddress(from) < amount.value;
  }

  public getBalanceOfAddress(address: Address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (transaction.fromAddress.equals(address)) {
          balance -= transaction.transactionAmount.value;
        }

        if (transaction.toAddress.equals(address)) {
          balance += transaction.transactionAmount.value;
        }
      }
    }
    console.log("Balance of Address:", balance);
    return balance;
  }

  getAllTransactionsForAddress(address: Address) {
    const transactions = [];

    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (this.transactionInvolvesAddress(transaction, address)) {
          transactions.push(transaction);
        }
      }
    }
    console.log(
      transactions.length,
      "total transaction for",
      address.publicKeyInHex
    );
    return transactions;
  }

  private transactionInvolvesAddress(
    transaction: Transaction,
    address: Address
  ) {
    return (
      transaction.fromAddress.equals(address) ||
      transaction.toAddress.equals(address)
    );
  }

  isChainValid() {
    const realGenisis = JSON.stringify(this.createGenisisBlock());

    if (realGenisis !== JSON.stringify(this.chain[0])) {
      return false;
    }

    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (!this.isValidChainLink(currentBlock, previousBlock)) {
        return false;
      }
    }
    return true;
  }

  private isValidChainLink(currentBlock: Block, previousBlock: Block) {
    return (
      previousBlock.hash.equals(currentBlock.previousHash) &&
      currentBlock.hasValidTransaction() &&
      currentBlock.hash.equals(currentBlock.calculateHash())
    );
  }
}
