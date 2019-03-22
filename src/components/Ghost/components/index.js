export { GalleryNoImage, GalleryWithImage } from "./Gallery";
export { BlogNoImage, BlogWithImage } from "./Blog";

export const shorten = (text, words = 30) => {
  return text
    .split(" ")
    .slice(0, words)
    .concat(["...more"])
    .join(" ");
};
