const fs = require('fs');
const Promise = require('bluebird');
// const waveform = require('./waveforms');

const dir =
  '/Users/jonathanolson/HackReactor/FrontEndCapstone/songDisplayComponent/helperJS/songs_for_soundcloud';

fs.readdir(dir, (err, files) => {
  console.log(files);
});
