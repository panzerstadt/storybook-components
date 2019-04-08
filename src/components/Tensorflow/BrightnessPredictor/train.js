import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

import { getData, convertToTensor } from "./helpers";

const ARR_LENGTH = 432;

const createModel = () => {
  const model = tf.sequential();

  model.add(tf.layers.dense({ inputShape: [432], units: 150, useBias: true })); // hidden layer
  model.add(tf.layers.dense({ units: 75, useBias: true }));

  // optional: sigmoid for logistic regression
  model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));
  //model.add(tf.layers.dense({ units: 1 }));

  return model;
};

const testModel = (model, inputData, normalizationData) => {
  const { inputMax, inputMin, labelMin, labelMax } = normalizationData;

  // Generate predictions for a uniform range of numbers between 0 and 1;
  // We un-normalize the data by doing the inverse of the min-max scaling
  // that we did earlier.
  const [xs, preds] = tf.tidy(() => {
    let xs = [0.001, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
    xs = xs.map(v => [...Array.from(Array(ARR_LENGTH)).map(_ => v)]);

    const inputXS = tf.tensor2d(xs, [xs.length, ARR_LENGTH]);

    const preds = model.predict(inputXS);

    // predictions results

    const unNormXs = inputXS.mul(inputMax.sub(inputMin)).add(inputMin);
    const unNormPreds = preds.mul(labelMax.sub(labelMin)).add(labelMin);

    // Un-normalize the data (arraySync because 2d)
    return [unNormXs.arraySync(), unNormPreds.dataSync()];
  });

  const predictedPoints = Array.from(xs).map((val, i) => {
    return { x: val[0], y: preds[i] };
  });

  const originalPoints = inputData.map(d => ({
    x: d.x[0],
    y: d.y
  }));

  tfvis.render.scatterplot(
    { name: "Model Predictions vs Original Data" },
    {
      values: [originalPoints, predictedPoints],
      series: ["original", "predicted"]
    },
    {
      xLabel: "RGB value",
      yLabel: "0 = dark, 1 = light",
      height: 300
    }
  );
};

const trainModel = async (model, inputs, labels) => {
  // Prepare the model for training.
  model.compile({
    optimizer: tf.train.adam(),
    loss: tf.losses.meanSquaredError,
    metrics: ["mse"]
  });

  const batchSize = 28;
  const epochs = 10;

  return await model.fit(inputs, labels, {
    batchSize,
    epochs,
    shuffle: true,
    callbacks: tfvis.show.fitCallbacks(
      { name: "Training Performance" },
      ["loss", "mse"],
      { height: 200, callbacks: ["onEpochEnd"] }
    )
  });
};

const TrainComponent = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [model, setModel] = useState(false);
  const [data, setData] = useState();

  // show and hide tfvis
  useEffect(() => {
    tfvis.visor().open();
    return () => tfvis.visor().close();
  }, []);

  // init, preview loaded data
  useEffect(() => {
    const runPreview = async () => {
      const data = await getData();
      setData(data);

      const preview = data.map(v => {
        return {
          x: tf.mean(v.x).dataSync()[0],
          y: v.y
        };
      });

      tfvis.render.scatterplot(
        { name: "distribution of labels" },
        { values: preview, series: ["mean rgb value", "isLight"] },
        {}
      );
    };

    runPreview();
  }, [getData]);

  // onClick, train data
  useEffect(() => {
    const train = async () => {
      const model = createModel();
      tfvis.show.modelSummary({ name: "model Summary" }, model);

      console.log("converting data");
      console.log(data);

      // Convert the data to a form we can use for training.
      const tensorData = convertToTensor(data);
      const { inputs, labels } = tensorData;

      console.log("Training starting");

      // Train the model
      await trainModel(model, inputs, labels);
      console.log("Done Training");

      // Make some predictions using the model and compare them to the
      // original data
      testModel(model, data, tensorData);

      setModel(model);
    };

    if (isTraining) {
      train();
      setIsTraining(false);
    }
  }, [isTraining]);

  const saveModel = async () => {
    alert("this will save two files, allow multiple files to continue.");
    await model.save("downloads://brightness-predictor");
  };

  return (
    <div style={{ backgroundColor: "#cecece", padding: 30 }}>
      <button onClick={setIsTraining}>train</button>
      <button onClick={saveModel}>save</button>
    </div>
  );
};

export default TrainComponent;
