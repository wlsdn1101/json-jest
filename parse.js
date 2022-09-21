const arrayValueParse = (value) => {
  if (value === "[]") {
    return Array(0);
  }

  const newValue = value.slice(1, -1).split(",");
  // split 함수를 실행하였을 때 ' jest'같은 형태로 나타나 이와 같이 첫 공백을 제거함
  return newValue.map((ele) =>
    ele[0] === " " ? parse(ele.slice(1)) : parse(ele),
  );
};

const parse = (value) => {
  // 타입 체크 boolean
  if (value === "true") {
    return true;
  } else if (value === "false") {
    return false;
  }
  // 타입 체크 number
  if (Number(value) || value === "0") {
    return Number(value);
  }
  // 타입 체크 null
  if (value === "null") {
    return null;
  }
  // 타입 체크 undefined
  if (value === "undefined") {
    throw new Error("undefined is not valid JSON at JSON.parse");
  }

  if (value[0] === "{") {
    return {};
  }
  // 타입 체크 array
  if (value[0] === "[") {
    return arrayValueParse(value);
  }

  if (value === "" || value === " ") {
    throw new Error(
      "Unexpected non-whitespace character after JSON at position 1",
    );
  }

  return value.slice(1, -1);
};

module.exports = parse;
