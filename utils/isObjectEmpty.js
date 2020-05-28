const isObjectEmpty = obj => {
  const keys = Object.keys(obj);
  return keys.length === 0;
};

export default isObjectEmpty;
