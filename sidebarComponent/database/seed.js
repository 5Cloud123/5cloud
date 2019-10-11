let data = require('./seed_data.js');
let db = require('./index.js');

for (let song of data) {
  let queryString =
    'insert into songs (artist, title, song_art, added, hashtag) values (';
  db.query();
}
