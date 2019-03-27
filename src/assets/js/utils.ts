export const GenerateRandom = (min: number, max: number): number => {
  const num: number = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
};
