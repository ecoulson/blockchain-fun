import Hash from "../hash/hash";

export default class Difficulty {
  private static readonly DifficultyCharacter = "0";

  private value_: number;

  constructor(value: number) {
    this.value_ = value;
  }

  get value() {
    return this.value_;
  }

  public isDifficulty(hash: Hash) {
    return this.value === hash.difficulty(Difficulty.DifficultyCharacter);
  }
}
