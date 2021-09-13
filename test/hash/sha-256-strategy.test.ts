import SHA256Strategy from "../../src/hash/sha-256-strategy";

describe("SHA256 Strategy Test Suite", () => {
  it("Should calculate the correct test vector when given an empty string", () => {
    const strategy = new SHA256Strategy();

    expect(strategy.hash("").value).toEqual(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    );
  });
});
