export default class Nonce {
  private currentNonce: number;

  constructor(nonce: number = 0) {
    this.currentNonce = nonce;
  }

  get value() {
    return this.currentNonce;
  }

  increment() {
    this.currentNonce++;
  }
}
