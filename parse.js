const parse = (str) => {
  if (str === "true") {
    return true;
  } else if (str === "false") {
    return false;
  }

  if (Number(str)) {
    return Number(str);
  }

  return str.slice(1, str.length - 1);
};

module.exports = parse;
