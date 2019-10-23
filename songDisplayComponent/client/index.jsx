/* eslint-disable camelcase */
import SongDisplay from './SongDisplay';

// Get song id from url
const splits = document.URL.split('/');
const song_id = splits[splits.length - 2];

ReactDOM.render(
  <SongDisplay song_id={song_id} />,
  document.querySelector('#SongDisplay')
);
