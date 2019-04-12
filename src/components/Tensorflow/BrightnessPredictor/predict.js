import * as tf from "@tensorflow/tfjs";

import { convertToObject } from "./helpers";

const MODEL = "assets/model/brightness/brightness-predictor.json";

const ARR_LENGTH = 432;

const loadModel = async () => {
  // in public folder
  console.log(
    "INFO: model has to be places in public folder to be accessible."
  );

  return await tf.loadLayersModel(MODEL);
};

let model;
const predictBrightness = async rgbarray => {
  if (!model) {
    try {
      model = await loadModel();
    } catch (e) {
      console.log("ERROR LOADING MODEL: ");
      console.log(e);
    }
  } else {
    return await tf.tidy(() => {
      const xs = [Array.from(rgbarray)];
      const inputXS = tf.tensor2d(xs, [xs.length, ARR_LENGTH]);

      const preds = model.predict(inputXS);

      preds.print();

      const out = preds.arraySync()[0][0];

      return out;
    });
  }
};

export default predictBrightness;
