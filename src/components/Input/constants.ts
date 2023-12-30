export const inputMasks = {
  'mm:ss': (value: string) => {
    const numericValue = value.replace(/\D/g, '');

    if (numericValue.length <= 2) {
      return numericValue;
    } else {
      return `${numericValue.slice(0, 2)}:${numericValue.slice(2, 4)}`;
    }
  },
};
