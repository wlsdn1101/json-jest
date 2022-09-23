const TYPE_ERROR_CASE = "NaN_Infinity_undefined";

const inputValueInObject = (valueObj) => {
  const keys = [];
  const values = [];
  const answer = {};

  let i = 0;

  while (true) {
    const nestedObj = valueObj
      .slice(valueObj.indexOf(":") + 1, valueObj.indexOf("}") + 1)
      .trim();

    keys.push(
      valueObj.slice(valueObj.indexOf('"') + 1, valueObj.indexOf(":") - 1),
    );

    if (nestedObj[0] === "{") {
      values.push(objectValueParse(nestedObj));
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
  if (value.replace(" ", "") !== "{}") {
    return inputValueInObject(value);
  }

  return {};
};

const arrayValueParse = (value) => {
  let newValue = value.slice(1, -1).trim();
  const returnArray = [];

  if (value.replace(" ", "") === "[]") {
    return [];
  }

  while (newValue !== "") {
    if (newValue[0] === "[") {
      returnArray.push(
        arrayValueParse(newValue.slice(0, newValue.indexOf("]") + 1)),
      );
      newValue = newValue.slice(newValue.indexOf("]") + 2).trim();
    } else {
      newValue.split(",").map((ele) => {
        returnArray.push(parse(ele.trim()));
      });

      break;
    }
  }
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
