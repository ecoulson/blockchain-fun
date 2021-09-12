import IBlockHash from "./block-hash.interface";

export default class NullBlockHash implements IBlockHash {
  public calculateHash() {
    return "";
  }
}
