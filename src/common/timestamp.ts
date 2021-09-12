export default class Timestamp {
  private timestamp: number;

  constructor() {
    this.timestamp = Date.now();
  }

  get value() {
    return this.timestamp;
  }
}
