import Block from "./block";
import Difficulty from "./difficulty";

export default interface IBlockHash {
  calculateHash(block: Block): string;
}
