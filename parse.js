const TYPE_ERROR_CASE = "NaN_Infinity_undefined";

const inputValueInObject = (valueObj) => {
  const keys = [];
  const values = [];
  const answer = {};

  let i = 0;

  while (true) {
    const checkNestedObj = valueObj
      .slice(valueObj.indexOf(":") + 1, valueObj.indexOf("}") + 1)
      .trim();

    keys.push(
      valueObj.slice(valueObj.indexOf('"') + 1, valueObj.indexOf(":") - 1),
    );

    if (checkNestedObj[0] === "{") {
      values.push(objectValueParse(checkNestedObj));
    } else {
      values.push(
        parse(
          valueObj.slice(
            valueObj.indexOf(":") + 1,
            valueObj.indexOf(",") ? valueObj.indexOf(",") : valueObj.length - 1,
          ),
        ),
      );
    }

    answer[keys[i]] = values[i];

    if (valueObj.indexOf(",") !== -1) {
      valueObj = valueObj.slice(valueObj.indexOf(",") + 1, valueObj.length);
    } else {
      return answer;
    }

    i++;
  }
};

const objectValueParse = (value) => {
  if (value !== "{}") {
    return inputValueInObject(value);
  }

  return {};
};

//2차원 배열 처리함수
const twoDimensionalArrayParse = (newValue) => {
  let arraySliceByEnd = newValue.slice(0, newValue.indexOf("]") + 1);
  const returnArray = [];

  for (let i = 0; i < newValue.split("]").length - 1; i++) {
    returnArray.push(
      arrayValueParse(
        arraySliceByEnd.slice(
          arraySliceByEnd.lastIndexOf("["),
          arraySliceByEnd.indexOf("]") + 1,
        ),
      ),
    );
    arraySliceByEnd = newValue.slice(arraySliceByEnd.indexOf("]") + 2).trim();
  }

  return returnArray;
};

const arrayValueParse = (value) => {
  const newValue = value.slice(1, -1);
  const returnArray = [];

  if (value === "[]") {
    return [];
  }

  if (newValue.split("]").length - 1 !== 0) {
    return twoDimensionalArrayParse(newValue);
  }

  newValue.split(",").map((ele) => returnArray.push(parse(ele.trim())));
  return returnArray;
};

const checkTypeError = (value) => {
  return TYPE_ERROR_CASE.split("_").includes(value);
};

const parse = (value) => {
  //Error check
  if (checkTypeError(value)) {
    throw new Error(`${value} is not valid JSON at JSON.parse`);
  }

  if (value === "" || value === " ") {
    throw new Error(
      "Unexpected non-whitespace character after JSON at position 1",
    );
  }

  // 타입 체크 boolean
  if (value == "true") {
    return true;
  }

  if (value == "false") {
    return false;
  }

  /** 타입 체크 number */
  // (0 은 falsy 한 값이라 따로 체크가 필요)
  if (Number(value) || value === "0") {
    return Number(value);
  }

  // 타입 체크 null
  if (value === "null") {
    return null;
  }

  // 타입 체크 obj
  if (value[0] === "{") {
    return objectValueParse(value);
  }

  // 타입 체크 array
  if (value[0] === "[") {
    return arrayValueParse(value);
  }

  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1);
  }
};

module.exports = parse;
