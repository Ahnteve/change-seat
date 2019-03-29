export const GenerateRandom = (min: number, max: number): number => {
  const num: number = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
};

export const LoadImages = (imagefiles: string[]): Object => {
  const loadedImages: Object = {};

  imagefiles.forEach(imagefile => {
    let image = new Image();
    image.src = imagefile;
    loadedImages[imagefile] = image;
  });

  return loadedImages;
};
