import Hash from "../hash/hash";
import Signature from "./signature";
import SigningKey from "./signing-key";

export default class Address {
  private static readonly System = "System";
  private hexAddress: string;

  constructor(value: string = Address.System) {
    this.hexAddress = value;
  }

  get publicKeyInHex() {
    return this.hexAddress;
  }

  isSystemAddress() {
    return this.hexAddress === Address.System;
  }

  verifySignature(hash: Hash, signature: Signature) {
    const publicKey = SigningKey.EllipticCurveAlgorithm.keyFromPublic(
      this.publicKeyInHex,
      "hex"
    );
    return publicKey.verify(hash.value, signature.value);
  }

  equals(other: Address) {
    return this.hexAddress === other.hexAddress;
  }
}
