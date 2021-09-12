import Block from "../../src/block/block";
import Difficulty from "../../src/block/difficulty";
import NullBlockHash from "../../src/block/null-block-hash";
import Timestamp from "../../src/common/timestamp";

describe("Block Tests Suite", () => {
  it("Should mine a block", () => {
    let block = new Block(NullBlockHash.Hash, [], new Timestamp());

    block.mineBlock(new Difficulty(2));
  });
});
