//
const checkFirstCharSpace = (objInArrayState, loopIndex) => {
  return (
    objInArrayState[loopIndex]
      .slice(objInArrayState[loopIndex].indexOf(":") + 1)
      .charAt(0) === " "
  );
};
//object의 value값의 앞에 공백이 있는 지 확인 후 value를 return
const returnObjectValue = (objInArrayState, loopIndex, isFirstValueSpace) => {
  return objInArrayState[loopIndex].slice(
    objInArrayState[loopIndex].indexOf(":") + 1 + isFirstValueSpace,
  );
};
//object의 key와 value부분을 각각 분리한 후 배열에 넣어준 뒤, 객체에 추가
const inputValueInObject = (objInArrayState) => {
  let objectKey = [],
    objectValue = [],
    answer = {};

  for (let i = 0; i < objInArrayState.length; i++) {
    objectKey.push(
      objInArrayState[i].slice(1, objInArrayState[i].indexOf(":") - 1),
    );

    objectValue.push(
      parse(
        returnObjectValue(
          objInArrayState,
          i,
          checkFirstCharSpace(objInArrayState, i),
        ),
      ),
    );

    answer[objectKey[i]] = objectValue[i];
  }

  return answer;
};

const objectValueParse = (value) => {
  let returnObject = {};
  const newValue = value
    .slice(1, -1)
    .split(",")
    .map((ele) => (ele[0] === " " ? ele.slice(1) : ele));

  if (value !== "{}") {
    returnObject = inputValueInObject(newValue);
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

const checkTypeError = (value) => {
  if (value === "NaN" || value === "Infinity") {
    return true;
  }
  return false;
};

const parse = (value) => {
  if (checkTypeError(value)) {
    throw new Error(`${value} is not valid JSON at JSON.parse`);
  }
  // 타입 체크 boolean
  if (value === "true") {
    return true;
  } else if (value === "false") {
    return false;
  }
  // 타입 체크 number
  if (Number(value) || value === "0") {
    console.log("afasf");
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
