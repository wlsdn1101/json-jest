const parse = (value) => {
  if (value === "true") {
    return true;
  } else if (value === "false") {
    return false;
  }

  if (Number(value) || value === "0") {
    return Number(value);
  }

  if (value === "null") {
    return null;
  }

  if (value[0] === "{") {
    return {};
  }

  return value.slice(1, value.length - 1);
};

module.exports = parse;
