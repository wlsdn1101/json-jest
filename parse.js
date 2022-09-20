const parse = (value) => {
  if (value === "true") {
    return true;
  } else if (value === "false") {
    return false;
  }

  if (Number(value) || value === "0") {
    return Number(value);
  }

  return value.slice(1, value.length - 1);
};

module.exports = parse;
