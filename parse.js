const objectValueParse = (value) => {
  let returnObject = {};

  if (value === "{}") {
    return {};
  }

  const newValue = value
    .slice(1, -1)
    .split(",")
    .map((ele) => (ele[0] === " " ? ele.slice(1) : ele));
  const objectValue = newValue.map((ele) =>
      parse(ele.slice(ele.indexOf(":") + 1)),
    ),
    objectKey = newValue.map((ele) => ele.slice(1, ele.indexOf(":") - 1));

  for (let i = 0; i < newValue.length; i++) {
    returnObject[objectKey[i]] = objectValue[i];
  }

  return returnObject;
};

const arrayValueParse = (value) => {
  const newValue = value.slice(1, -1).split(",");
  if (value === "[]") {
    return Array(0);
  }

  if (value.indexOf("]") < 0) {
    return value.slice(1);
  }

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
    return objectValueParse(value);
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
