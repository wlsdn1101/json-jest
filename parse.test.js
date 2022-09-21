const parse = require("./parse");

describe("parse - Primitive type", () => {
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
    expect(parse("null")).toBeNull();
  });

  it("문자열 -2를 입력하면 숫자 -2를 출력한다.", () => {
    expect(parse("-2")).toBe(-2);
  });
});

describe("parse - Reference Type", () => {
  it("문자열 {}를 입력하면 {}를 출력한다.", () => {
    expect(parse("{}")).toEqual({});
  });

  it('문자열 [1, 2, "3"]을 입력하면 [1, 2, "3"]을 출력한다.', () => {
    expect(parse('[1, 2, "3"]')).toEqual([1, 2, "3"]);
  });

  it("문자열 [1, 2, null]을 입력하면 [1, 2, null]을 출력한다.", () => {
    expect(parse("[1, 2, null]")).toEqual([1, 2, null]);
  });

  it('문자열 [1, 2, "null"]을 입력하면 [1, 2, "null"]을 반환한다.', () => {
    expect(parse('[1, 2, "null"]')).toEqual([1, 2, "null"]);
  });

  it("문자열 []을 입력하면 []을 반환한다.", () => {
    expect(parse("[]")).toEqual([]);
  });

  it('문자열 [" "]를 입력하면 [" "]를 반환한다.', () => {
    expect(parse('[" "]')).toEqual([" "]);
  });
  // toEqual 안에 array값이 변해도 정답으로 출력되는 오류
  it("문자열 [[], []]를 입력하면 [Array(0), Array(0)]을 반환한다.", () => {
    expect(parse("[[], []]")).toEqual([Array(0), Array(0)]);
  });

  it("문자열 {'result':true, 'count':42}를 입력하면 객체 {'result':true, 'count':42}를 반환한다.", () => {
    expect(parse("{'result':true, 'count':42}")).toEqual({
      result: true,
      count: 42,
    });
  });

  it.only('문자열 {"result":true, "count": {"result":true}}를 입력하면 객체 {"result":true, "count": {"result":true}}를 반환한다.', () => {
    expect(parse('{"result":true, "count": {"result":true}}')).toEqual({
      result: true,
      count: { result: true },
    });
  });
  /*it.only("문자열 [[1,2,3], [1,2,3]]를 입력하면 [Array(), Array()]을 반환하지 않는다.", () => {
    expect(parse("[[1,2,3], [4,5,6]]")).toEqual([Array(3), Array(3)]);
  });*/
});

describe("parse - Error handling", () => {
  it('문자열 " "를 입력하면 Error를 반환한다.', () => {
    expect(() => parse(" ")).toThrow(
      "Unexpected non-whitespace character after JSON at position 1",
    );
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

  it("문자열 undefined를 입력하면 Error를 반환한다.", () => {
    expect(() => parse("undefined")).toThrow(
      "undefined is not valid JSON at JSON.parse",
    );
  });
});
