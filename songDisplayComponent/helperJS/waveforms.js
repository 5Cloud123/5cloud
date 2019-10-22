/* eslint-disable camelcase */

const fs = require('fs');
const Promise = require('bluebird');

// 1 - GET WAVEFORMS

// var wavesurfer = WaveSurfer.create({
//   container: document.querySelector('#waveform'),
//   barWidth: 2,
//   barHeight: 1, // the height of the wave
//   barGap: null, // the optional spacing between bars of the wave, if not provided will be calculated in legacy format
// });

// const filename = './songs_for_soundcloud/Working For It.mp3';

// const getWaveformData = (filename) => {
//   wavesurfer.load(filename);

//   wavesurfer.on('ready', function() {
//     return wavesurfer.exportPCM();
//     // console.log(wavesurfer.exportImage());
//   });
// };

// getWaveformData(filename);

// 1 - CLEAN DATA, WRITE TO FILE

// Create function to clean individual song data
const reduceData = (songObj) => {
  return new Promise((resolve, reject) => {
    const original_data = JSON.parse(songObj.raw_data);

    const positiveValues = [];
    const negativeValues = [];

    // Calculate all positive, negative values
    for (let i = 0; i < original_data.length - 2; i += 7) {
      // Add full-size bars to positive values
      // Add 1/5-size bars to negative values
      if (original_data[i] >= 0) {
        positiveValues.push(original_data[i]);
        negativeValues.push(-(original_data[i] + original_data[i + 2]) / 10);
      } else {
        positiveValues.push(-(original_data[i] + original_data[i + 2]) / 2);
        negativeValues.push(original_data[i] / 2.5);
      }
    }
    // Get empty labels
    const xValues = original_data
      .slice(0, original_data.length / 8)
      .map((value) => '');

    songObj.clean_data = {
      positiveValues,
      negativeValues,
      xValues,
    };

    resolve(songObj);
  });
};

// Calculate cleaned data (reduce size of waveform by factor of 8)
const cleanData = (json, callback) => {
  const keys = Object.keys(json);
  const promiseArray = [];
  for (let i = 0; i < keys.length; i++) {
    promiseArray.push(reduceData(json[keys[i]]));
  }
  Promise.all(promiseArray).then((arr) => {
    callback(null, arr);
  });
};

// Get JSON
let data;

const url =
  '/Users/jonathanolson/HackReactor/FrontEndCapstone/songDisplayComponent/helperJS/waveformData.json';

fs.readFile(url, 'utf8', function(err, data) {
  if (err) {
    throw err;
  }

  // Parse data
  data = JSON.parse(data);

  // Clean data
  cleanData(data, (err, arr) => {
    objStr = JSON.stringify(arr);
    fs.writeFile(
      './songDisplayComponent/helperJS/cleanedJSON.json',
      objStr,
      (err) => {
        if (err) {
          throw err;
        }
        console.log('The file has been saved!');
      }
    );
  });
});
