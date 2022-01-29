export const getLastKey = (obj: object) => {
  const keys = Object.keys(obj);
  return keys[keys.length - 1];
};
