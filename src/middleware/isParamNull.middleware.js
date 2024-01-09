export const ifBooksParamNull = (params) => {
  let array = [];
  for (let value of Object.values(params)) {
    if (value === "null") {
      array.push(null);
      continue;
    }
    array.push(value);
  }
  return array;
};
