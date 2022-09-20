const parse = (str) => {
  if (str === "true") {
    return true;
  } else if (str === "false") {
    return false;
  }

  return str.slice(1, str.length - 1);
};

module.exports = parse;
