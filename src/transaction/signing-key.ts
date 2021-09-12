import Address from "./address";

export default class SigningKey {
  isFrom(from: Address) {
    return false;
  }

  sign(hash: string) {
    return null;
  }
}
