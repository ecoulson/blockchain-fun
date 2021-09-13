import { createHash } from "crypto";
import Hash from "./hash";

export default class SHA256Strategy {
  private static readonly HashingAlgorithm = "sha256";

  hash(input: string): Hash {
    return new Hash(
      createHash(SHA256Strategy.HashingAlgorithm).update(input).digest("hex")
    );
  }
}
