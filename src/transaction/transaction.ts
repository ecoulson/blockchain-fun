import SHA256Strategy from "../hash/sha-256-strategy";
import Address from "./address";
import Amount from "./amount";
import Timestamp from "../common/timestamp";
import SigningKey from "./signing-key";
import Signature from "./signature";

export default class Transaction {
  private readonly from: Address;
  private readonly to: Address;
  private readonly amount: Amount;
  private readonly timestamp: Timestamp;
  private readonly hashingStrategy: SHA256Strategy;
  private signature?: Signature;

  constructor(from: Address, to: Address, amount: Amount) {
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.timestamp = new Timestamp();
    this.hashingStrategy = new SHA256Strategy();
  }

  get fromAddress() {
    return this.from;
  }

  get toAddress() {
    return this.to;
  }

  get transactionAmount() {
    return this.amount;
  }

  isValid() {
    if (this.from.isSystemAddress()) {
      return true;
    }
    if (!this.signature || !this.signature.isValid()) {
      throw new Error("No signature on transaction");
    }
    return this.from.verifySignature(this.hash, this.signature!);
  }

  get hash() {
    return this.hashingStrategy.hash(this.serialize());
  }

  sign(signingKey: SigningKey) {
    if (!signingKey.isFrom(this.from)) {
      throw new Error("Can not sign for other wallets");
    }
    this.signature = signingKey.sign(this.hash);
  }

  serialize() {
    return (
      this.from.publicKeyInHex +
      this.to.publicKeyInHex +
      this.timestamp.value +
      this.amount.value
    );
  }
}
