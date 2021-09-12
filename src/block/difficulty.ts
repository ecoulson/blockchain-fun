export default class Difficulty {
  private static readonly DifficultyCharacter = "0";

  private value_: number;

  constructor(value: number) {
    this.value_ = value;
  }

  get value() {
    return this.value_;
  }

  public isDifficulty(hash: string) {
    let result = true;
    for (let i = 0; i < this.value; i++) {
      result = this.checkForZeroAtPosition(hash, i);
    }
    return true;
  }

  private checkForZeroAtPosition(hash: string, i: number) {
    return hash.charAt(i) === Difficulty.DifficultyCharacter;
  }
}
