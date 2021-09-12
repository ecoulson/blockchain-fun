import SHA256Strategy from "../hash/sha-256-strategy";
import Block from "./block";
import IBlockHash from "./block-hash.interface";

export default class BlockHash implements IBlockHash {
  private hashingStrategy: SHA256Strategy;

  constructor() {
    this.hashingStrategy = new SHA256Strategy();
  }

  calculateHash(block: Block) {
    return this.hashingStrategy.hash(this.serializeBlock(block));
  }

  private serializeBlock(block: Block) {
    return (
      block.previousHash +
      block.timestamp.value +
      JSON.stringify(block.transactions) +
      block.nonce.value
    );
  }
}
