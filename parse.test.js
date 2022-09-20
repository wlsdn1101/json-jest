const parse = require("./parse");

describe("parse", () => {
  it("문자열 jest를 넣으면 문자열 jest가 나온다", () => {
    expect(parse('"jest"')).toEqual("jest");
  });
});
