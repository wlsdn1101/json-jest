const parse = require("./parse");

describe("parse", () => {
  it("문자열 'jest'를 넣으면 문자열 jest를 출력한다.", () => {
    expect(parse('"jest"')).toBe("jest");
  });

  it("문자열 true를 입력하면 Boolean 값 true를 출력한다.", () => {
    expect(parse("true")).toBe(true);
  });
});
