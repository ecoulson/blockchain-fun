import Address from "./address";
import { ec as EllipticCurve } from "elliptic";
import Signature from "./signature";
import Hash from "../hash/hash";

export default class SigningKey {
  public static readonly EllipticCurveAlgorithm = new EllipticCurve(
    "secp256k1"
  );
  private static readonly SigningAlgorithm = "base64";
  private readonly key: EllipticCurve.KeyPair;

  constructor(privateKey: string) {
    this.key = SigningKey.EllipticCurveAlgorithm.keyFromPrivate(privateKey);
  }

  get publicKey() {
    return this.key.getPublic("hex");
  }

  isFrom(from: Address) {
    return this.key.getPublic("hex") === from.publicKeyInHex;
  }

  sign(hash: Hash) {
    return new Signature(
      this.key.sign(hash.value, SigningKey.SigningAlgorithm)
    );
  }
}
