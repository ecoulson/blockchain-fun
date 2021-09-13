import { ec as EllipticCurve } from "elliptic";

export default class Signature {
  private readonly ellipticSignature: EllipticCurve.Signature;

  constructor(ellipticSignature: EllipticCurve.Signature) {
    this.ellipticSignature = ellipticSignature;
  }

  get value() {
    return this.ellipticSignature.toDER("hex") as string;
  }

  isValid() {
    return this.value.length > 0;
  }
}
