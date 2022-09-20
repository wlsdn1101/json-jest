const arrayValueParse = (value) => {
  let newValue = value.slice(1, -1).split(","),
    returnValue = [];

  newValue.map((ele) =>
    returnValue.push(
      Number(ele) || ele === "0" ? Number(ele) : ele.slice(2, -1),
    ),
  );

  return returnValue;
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

  if (value[0] === "{") {
    return {};
  }
  // 타입 체크 array
  if (value[0] === "[") {
    return arrayValueParse(value);
  }

  return value.slice(1, value.length - 1);
};

module.exports = parse;
