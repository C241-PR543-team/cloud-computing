import express from 'express';
import * as tf from '@tensorflow/tfjs-node';
import axios from 'axios';
import dotenv from 'dotenv';
import csv from 'csv-parser';
import { createWriteStream, unlink } from 'fs';
import { pipeline } from 'stream/promises';
import { join } from 'path';

dotenv.config();

let model;
let df = [];

// Custom TFOpLambda layer
class TFOpLambda extends tf.layers.Layer {
  constructor(config) {
    super(config);
    this.axis = config.axis;
  }

  call(inputs, kwargs) {
    const [input] = inputs;
    return tf.norm(input, this.axis);
  }

  static get className() {
    return 'TFOpLambda';
  }
}

tf.serialization.registerClass(TFOpLambda);

// Function to load model from URL
async function loadModel() {
  const modelUrl = process.env.MODEL_URL;
  model = await tf.loadLayersModel(modelUrl);
}

// Function to load CSV data from URL
async function loadCSVData() {
  const placesUrl = process.env.PLACES_URL;
  const response = await axios.get(placesUrl, { responseType: 'stream' });

  return new Promise((resolve, reject) => {
    response.data.pipe(csv())
      .on('data', (row) => {
        df.push(Object.values(row).map(Number));  // Assuming the CSV contains numeric data
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        resolve();
      })
      .on('error', reject);
  });
}

// Load model and CSV data on server start
(async () => {
  await loadModel();
  await loadCSVData();
})();

// Function to simulate DataFrame in JavaScript
function createDataFrame(data) {
  return tf.tensor2d(data, [437, 12]);  // Explicitly providing shape
}

async function predict(req, res) {
  try {
    const { new_user_id, new_rating_count, new_rating_ave,
            new_alam, new_belanja, new_budaya, new_edukasi, new_hiburan,
            new_keluarga, new_petualangan, new_relaksasi, new_religius } = req.body;

    // Create user_vec array
    const user_vec = [
      new_user_id, new_rating_count, new_rating_ave,
      new_alam, new_belanja, new_budaya, new_edukasi, new_hiburan,
      new_keluarga, new_petualangan, new_relaksasi, new_religius
    ];

    // Ensure input1 matches the required shape
    if (user_vec.length !== 12) {
      return res.status(400).json({ error: 'Invalid input length' });
    }

    // Convert user_vec and df to tensors
    const tensorUserVec = tf.tensor2d([user_vec.slice(0, 9)], [1, 9]);
    const tensorDf = createDataFrame(df);

    // Make prediction
    const prediction = model.predict([tensorUserVec, tensorDf]);
    const result = prediction.dataSync();  // Assuming it's a single value

    res.json({ result: Array.from(result) });  // Return the result as an array
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default { predict };
