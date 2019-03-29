export const GenerateRandom = (min: number, max: number): number => {
  const num: number = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
};

export const LoadImages = (imagefiles: string[]): HTMLImageElement[] => {
  let loadcount = 0;
  let preloaded = false;

  const loadedImages: HTMLImageElement[] = [];

  imagefiles.forEach(imagefile => {
    let image = new Image();
    image.onload = function() {
      loadcount++;
      if (loadcount == imagefiles.length) {
        preloaded = true;
      }
    };
    image.src = imagefile;
    loadedImages.push(image);
  });

  return loadedImages;
};
