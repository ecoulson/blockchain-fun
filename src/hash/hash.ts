export default class Hash {
  private readonly _value;

  constructor(value: string) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  equals(other: Hash) {
    return this.value === other.value;
  }

  difficulty(zeroCharacter: string) {
    let result = 0;
    while (this.value.charAt(result) === zeroCharacter) {
      result++;
    }
    return result;
  }
}
