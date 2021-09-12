import Address from "./address";
import Amount from "./amount";
import Timestamp from "./timestamp";

export default class Transaction {
  private readonly from: Address;
  private readonly to: Address;
  private readonly amount: Amount;
  private readonly timestamp: Timestamp;

  constructor(from: Address, to: Address, amount: Amount) {
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.timestamp = new Timestamp();
  }

  isValid() {
    return false;
  }

  serialize() {
    
  }
}
