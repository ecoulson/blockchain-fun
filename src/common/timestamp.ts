export default class Timestamp {
  private timestamp: number;

  constructor(date: Date = new Date()) {
    this.timestamp = date.valueOf();
  }

  get value() {
    return this.timestamp;
  }
}
