import Generic from "./generic/ImageWithText";

import Text from "./aaronc/Text";
import Image from "./aaronc/Image";
import PanningImage from "./aaronc/PanningImage";

export const AaronC = {
  text: Text,
  image: Image,
  heroImage: PanningImage
};

export default Generic;

const types = {
  data: "string",
  imageData: "base64 string || image url",
  url: "url"
};
