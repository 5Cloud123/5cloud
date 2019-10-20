/* eslint-disable camelcase */
const faker = require('faker');

const getRandomArbitrary = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const generateComments = () => {
  // Get all song IDs
  const songIDs = [
    {id: 'Song_00001', duration: 316},
    {id: 'Song_00002', duration: 366},
    {id: 'Song_00003', duration: 266},
    {id: 'Song_00004', duration: 321},
    {id: 'Song_00005', duration: 233},
    {id: 'Song_00006', duration: 207},
    {id: 'Song_00007', duration: 191},
    {id: 'Song_00008', duration: 226},
    {id: 'Song_00009', duration: 212},
    {id: 'Song_00010', duration: 228},
    {id: 'Song_00011', duration: 286},
    {id: 'Song_00012', duration: 209},
    {id: 'Song_00013', duration: 290},
    {id: 'Song_00014', duration: 182},
    {id: 'Song_00015', duration: 203},
    {id: 'Song_00016', duration: 242},
    {id: 'Song_00017', duration: 245},
    {id: 'Song_00018', duration: 252},
    {id: 'Song_00019', duration: 209},
    {id: 'Song_00020', duration: 249},
    {id: 'Song_00021', duration: 220},
    {id: 'Song_00022', duration: 203},
    {id: 'Song_00023', duration: 221},
    {id: 'Song_00024', duration: 285},
    {id: 'Song_00025', duration: 266},
    {id: 'Song_00026', duration: 174},
    {id: 'Song_00027', duration: 243},
    {id: 'Song_00028', duration: 234},
    {id: 'Song_00029', duration: 262},
    {id: 'Song_00030', duration: 241},
    {id: 'Song_00031', duration: 159},
    {id: 'Song_00032', duration: 194},
    {id: 'Song_00033', duration: 255},
    {id: 'Song_00034', duration: 218},
    {id: 'Song_00035', duration: 222},
    {id: 'Song_00036', duration: 175},
    {id: 'Song_00037', duration: 222},
    {id: 'Song_00038', duration: 213},
    {id: 'Song_00039', duration: 215},
    {id: 'Song_00040', duration: 184},
    {id: 'Song_00041', duration: 135},
    {id: 'Song_00042', duration: 199},
    {id: 'Song_00043', duration: 214},
    {id: 'Song_00044', duration: 191},
    {id: 'Song_00045', duration: 212},
    {id: 'Song_00046', duration: 252},
    {id: 'Song_00047', duration: 203},
    {id: 'Song_00048', duration: 233},
    {id: 'Song_00049', duration: 180},
    {id: 'Song_00050', duration: 239},
    {id: 'Song_00051', duration: 237},
    {id: 'Song_00052', duration: 292},
    {id: 'Song_00053', duration: 186},
    {id: 'Song_00054', duration: 204},
    {id: 'Song_00055', duration: 233},
    {id: 'Song_00056', duration: 198},
    {id: 'Song_00057', duration: 212},
    {id: 'Song_00058', duration: 165},
    {id: 'Song_00059', duration: 198},
    {id: 'Song_00060', duration: 278},
    {id: 'Song_00061', duration: 204},
    {id: 'Song_00062', duration: 245},
    {id: 'Song_00063', duration: 218},
    {id: 'Song_00064', duration: 240},
    {id: 'Song_00065', duration: 255},
    {id: 'Song_00066', duration: 216},
    {id: 'Song_00067', duration: 207},
    {id: 'Song_00068', duration: 180},
    {id: 'Song_00069', duration: 170},
    {id: 'Song_00070', duration: 203},
    {id: 'Song_00071', duration: 215},
    {id: 'Song_00072', duration: 178},
    {id: 'Song_00073', duration: 220},
    {id: 'Song_00074', duration: 195},
    {id: 'Song_00075', duration: 178},
    {id: 'Song_00076', duration: 226},
    {id: 'Song_00077', duration: 148},
    {id: 'Song_00078', duration: 202},
    {id: 'Song_00079', duration: 206},
    {id: 'Song_00080', duration: 267},
    {id: 'Song_00081', duration: 262},
    {id: 'Song_00082', duration: 217},
    {id: 'Song_00083', duration: 185},
    {id: 'Song_00084', duration: 240},
    {id: 'Song_00085', duration: 206},
    {id: 'Song_00086', duration: 178},
    {id: 'Song_00087', duration: 269},
    {id: 'Song_00088', duration: 204},
    {id: 'Song_00089', duration: 216},
    {id: 'Song_00090', duration: 189},
    {id: 'Song_00091', duration: 225},
    {id: 'Song_00092', duration: 242},
    {id: 'Song_00093', duration: 215},
    {id: 'Song_00094', duration: 196},
    {id: 'Song_00095', duration: 207},
    {id: 'Song_00096', duration: 280},
    {id: 'Song_00097', duration: 235},
    {id: 'Song_00098', duration: 215},
    {id: 'Song_00099', duration: 186},
    {id: 'Song_00100', duration: 231},
  ];

  const formattedComments = [];

  // For each song ID, create username, text, and timestamp
  for (let i = 0; i < songIDs.length; i++) {
    const currentSong = songIDs[i];

    // Get random number of comments for current song
    const numComments = getRandomArbitrary(15, 30);

    // For each comment, create username, text, timestamp
    for (let j = 0; j < numComments; j++) {
      const song_id = currentSong.id;

      // Create comment, username, timestamp
      const comment = faker.random.words();
      const user_name = faker.internet.userName();
      const time_stamp = getRandomArbitrary(0, currentSong.duration);

      // Add to overall array
      formattedComments.push([song_id, user_name, time_stamp, comment]);
    }
  }
  return formattedComments;
};

module.exports = generateComments;
