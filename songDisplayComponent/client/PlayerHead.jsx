/* eslint-disable camelcase */

const styles = require('./style/SongDisplay.module.css');

const PlayerHead = (props) => {
  const {playButtonState, currentSongObj, playSong, pauseSong} = props;
  const {artist_name, song_name, date_posted, tag} = currentSongObj;

  return (
    <div className={styles['player-head']}>
      <div
        className={`${styles['play-button-wrapper']} ${styles['button']}`}
        onClick={() => {
          if (playButtonState === 'play') {
            playSong();
          } else {
            pauseSong();
          }
        }}
      >
        <div
          className={`${styles[playButtonState + '-button']} ${
            styles['button']
          }`}
        ></div>
      </div>
      <div className={styles['artist-name-container']}>
        <span
          className={`${styles['artist-name']} ${
            styles['fit-width-to-contents']
          }`}
        >
          <a href='#' className={styles['artist-name']}>
            {artist_name}
          </a>
        </span>
      </div>
      <div className={styles['song-name-container']}>
        <span
          className={`${styles['song-name']} ${
            styles['fit-width-to-contents']
          }`}
        >
          {song_name}
        </span>
      </div>
      <div className={styles['date-posted-container']}>
        <div className={styles['date-posted']}>{date_posted}</div>
      </div>
      <div className={styles['tags-container']}>
        <div className={`${styles['tags']} ${styles['fit-width-to-contents']}`}>
          {tag}
        </div>
      </div>
    </div>
  );
};

export default PlayerHead;
