const parse = require("./parse");

describe("parse", () => {
  it("문자열 'jest'를 넣으면 문자열 jest를 출력한다.", () => {
    expect(parse('"jest"')).toBe("jest");
  });

  it("문자열 true를 입력하면 Boolean 값 true를 출력한다.", () => {
    expect(parse("true")).toBe(true);
  });

  it("문자열 2022를 입력하면 숫자 2022를 출력한다.", () => {
    expect(parse("2022")).toBe(2022);
  });

  it("문자 0을 입력하면 숫자 0을 출력한다.", () => {
    expect(parse("0")).toBe(0);
  });

  it("문자열 null을 입력하면 null을 출력한다.", () => {
    expect(parse("null")).toBe(null);
  });

  it("문자열 {}를 입력하면 {}를 출력한다.", () => {
    expect(parse("{}")).toEqual({});
  });

  it('배열 [1, 2, "3"]을 입력하면 [1, 2, "3"]을 출력한다.', () => {
    expect(parse('[1, 2, "3"]')).toEqual([1, 2, "3"]);
  });

  it("문자열 undefined를 입력하면 Error를 반환한다.", () => {
    expect(() => parse("undefined")).toThrow(
      "undefined is not valid JSON at JSON.parse",
    );
  });

  it("문자열 [1, 2, null]을 입력하면 [1, 2, null]을 출력한다.", () => {
    expect(parse("[1, 2, null]")).toMatchObject([1, 2, null]);
  });

  it("문자열 [1, 2, undefined]를 입력하면 Error를 반환한다.", () => {
    expect(() => parse("[1, 2, undefined]")).toThrow(
      "undefined is not valid JSON at JSON.parse",
    );
  });

  it("문자열 [1, 2, 3, ]를 입력하면 Error를 반환한다.", () => {
    expect(() => parse("[1, 2, 3, ]")).toThrow(
      "Unexpected non-whitespace character after JSON at position 1",
    );
  });

  it('문자열 " "를 입력하면 Error를 반환한다.', () => {
    expect(() => parse(" ")).toThrow(
      "Unexpected non-whitespace character after JSON at position 1",
    );
  });

  it('문자열 [1, 2, "null"]을 입력하면 [1, 2, "null"]을 반환한다.', () => {
    expect(parse('[1, 2, "null"]')).toMatchObject([1, 2, "null"]);
  });
});
