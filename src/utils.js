export const getFormatted = (arr, value) => {
  return arr.map(item => ({text: item[value], value: item.id}));
};
