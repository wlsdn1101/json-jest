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

  it('문자열 {"result":true, "count": {"result":true}}를 입력하면 객체 {"result":true, "count": {"result":true}}를 반환한다.', () => {
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

  it("문자열 {'result': true, }를 입력하면 Error를 반환한다.", () => {
    expect(() => parse('{"result": true, }')).toThrow(
      "Unexpected non-whitespace character after JSON at position 1",
    );
  });

  it("문자열 NaN를 입력하면 Error를 반환한다.", () => {
    expect(() => parse("NaN")).toThrow("NaN is not valid JSON at JSON.parse");
  });

  it("문자열 Infinity를 입력하면 Error를 반환한다.", () => {
    expect(() => parse("Infinity")).toThrow(
      "Infinity is not valid JSON at JSON.parse",
    );
  });
});
/*const parse = require("./parse");

describe("parse", () => {
  it("문자 1을 넣으면 문자 1이 나온다.", () => {
    expect(parse('"1"')).toBe("1");
  });

  it("문자 jest를 넣으면 jest가 나온다.", () => {
    expect(parse('"jest"')).toBe("jest");
  });

  it('"null"을 넣으면 null이 나온다.', () => {
    expect(parse("null")).toBe(null);
  });

  it('"true"를 넣으면 true가 나온다.', () => {
    expect(parse("true")).toBe(true);
  });

  it('"false"를 넣으면 false가 나온다.', () => {
    expect(parse("false")).toBe(false);
  });

  it('"35"를 넣으면 35가 나온다.', () => {
    expect(parse("35")).toBe(35);
  });

  it('"-2"를 넣으면 -2가 나온다.', () => {
    expect(parse("-2")).toBe(-2);
  });

  it('"-0.5"를 넣으면 -0.5가 나온다.', () => {
    expect(parse("-0.5")).toBe(-0.5);
  });

  it("NaN은 허용하지 않는다", () => {
    expect(() => parse("NaN")).toThrow('"NaN" is not valid JSON');
  });

  it("Infinity는 허용하지 않는다.", () => {
    expect(() => parse("Infinity")).toThrow('"Infinity" is not valid JSON');
  });

  it('"[]"를 넣으면 []가 나온다.', () => {
    expect(parse("[]")).toEqual([]);
  });

  it('"["qmit"]"를 넣으면 ["qmit"]가 나온다.', () => {
    expect(parse('["qmit"]')).toEqual(["qmit"]);
  });

  it('"["jest", "qmit"]"를 넣으면 ["jest", "qmit"]가 나온다.', () => {
    expect(parse('["jest", "qmit"]')).toEqual(["jest", "qmit"]);
  });

  it('"[1, 2, 3]"을 넣으면 [1, 2, 3]이 나온다.', () => {
    expect(parse("[1, 2, 3]")).toEqual([1, 2, 3]);
  });

  it('"[1, 5, "false", true, null]"을 넣으면 [1, 5, "false", true, null]이 나온다.', () => {
    expect(parse('[1, 5, "false", true, null]')).toEqual([
      1,
      5,
      "false",
      true,
      null,
    ]);
  });

  it('"{}"를 넣으면 {}가 나온다.', () => {
    expect(parse("{}")).toEqual({});
  });

  it('"{"name": "John"}"을 넣으면 {name: "John"}이 나온다.', () => {
    expect(parse('{"name": "John"}')).toEqual({ name: "John" });
  });

  it('"{"result": true, "count": 42, "name": "John", userList: ["Kevin", "Dan"], children: null}"을 넣으면 {result: true, count: 42, name: "John", userList: ["Kevin", "Dan"],children: null}가 나온다."', () => {
    expect(
      parse(
        '{"result": true, "count": 42, "name": "John", userList: ["Kevin", "Dan"], children: null}',
      ),
    ).toEqual({
      result: true,
      count: 42,
      name: "John",
      userList: ["Kevin", "Dan"],
      children: null,
    });
  });
});
*/
