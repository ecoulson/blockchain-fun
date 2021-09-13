export default class Amount {
  private readonly _value: number;

  constructor(value: number) {
    if (value <= 0) {
      throw new Error("Amount must be greater than 0");
    }
    this._value = value;
  }

  get value() {
    return this._value;
  }
}
