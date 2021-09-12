import { createHash } from "crypto";

export default class SHA256Strategy {
  private static readonly HashingAlgorithm = "sha256";

  hash(input: string): string {
    return createHash(SHA256Strategy.HashingAlgorithm)
      .update(input)
      .digest("hex");
  }
}
