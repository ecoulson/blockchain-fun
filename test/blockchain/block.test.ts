import Block from "../../src/blockchain/block";
import Difficulty from "../../src/blockchain/difficulty";
import NullBlockHash from "../../src/blockchain/null-block-hash";
import Timestamp from "../../src/blockchain/timestamp";

describe("Block Tests Suite", () => {
  it("Should mine a block", () => {
    let block = new Block(NullBlockHash.Hash, [], new Timestamp());

    block.mineBlock(new Difficulty(2));
  });
});
