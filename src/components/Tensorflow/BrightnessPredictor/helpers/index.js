import * as tf from "@tensorflow/tfjs";

import DATA_DARK from "../data/dark.json";
import DATA_LIGHT from "../data/light.json";

export const getData = async () => {
  const light = DATA_LIGHT.data;
  const dark = DATA_DARK.data;

  console.log("number of examples: ");
  console.log("light: ", light.length);
  console.log("dark: ", dark.length);

  const output = [
    ...light.map(v => ({
      x: v,
      y: 1
    })),
    ...dark.map(v => ({
      x: v,
      y: 0
    }))
  ];

  return output;
};

/**
 * Convert the input data to a tensors that we can use for machine
 * learning. We will also do the important best practices of _shuffling_
 * the data and _normalizing_ the data
 * MPG on the y-axis.
 */
export const convertToTensor = data => {
  // Wrapping these calculations in a tidy will dispose any
  // intermediate tensors.

  return tf.tidy(() => {
    // Step 1. Shuffle the data
    tf.util.shuffle(data);

    // Step 2. Convert data to Tensor
    const inputs = data.map(v => v.x);
    const labels = data.map(v => v.y);

    const inputTensor = tf.tensor2d(inputs, [inputs.length, inputs[0].length]);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    //Step 3. Normalize the data to the range 0 - 1 using min-max scaling
    const inputMax = inputTensor.max();
    const inputMin = inputTensor.min();
    const labelMax = labelTensor.max();
    const labelMin = labelTensor.min();

    const normalizedInputs = inputTensor
      .sub(inputMin)
      .div(inputMax.sub(inputMin));
    const normalizedLabels = labelTensor
      .sub(labelMin)
      .div(labelMax.sub(labelMin));

    return {
      inputs: normalizedInputs,
      labels: normalizedLabels,
      // Return the min/max bounds so we can use them later.
      inputMax,
      inputMin,
      labelMax,
      labelMin
    };
  });
};

export const download = (
  content,
  fileName = "json.txt",
  contentType = "text/plain"
) => {
  let a = document.createElement("a");
  let file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

export const convertToArray = domOBJ => {
  let arr = [];
  for (var p in domOBJ) {
    arr.push(domOBJ[p]);
  }
  return arr;
};

export const convertToObject = domOBJ => {
  let obj = {};
  for (var p in domOBJ) {
    obj[p] = domOBJ[p];
  }
  return obj;
};
