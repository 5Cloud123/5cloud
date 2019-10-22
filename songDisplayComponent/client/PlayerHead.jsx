/* eslint-disable camelcase */

const PlayerHead = (props) => {
  const {playButtonState, currentSongObj, playSong, pauseSong} = props;
  const {artist_name, song_name, date_posted, tag} = currentSongObj;

  return (
    <div className='player-head'>
      <div
        className='play-button-wrapper button'
        onClick={() => {
          if (playButtonState === 'play') {
            playSong();
          } else {
            pauseSong();
          }
        }}
      >
        <div className={playButtonState + '-button button'}></div>
      </div>
      <div className='artist-name-container'>
        <span className='artist-name fit-width-to-contents'>
          <a href='#' className='artist-name'>
            {artist_name}
          </a>
        </span>
      </div>
      <div className='song-name-container'>
        <span className='song-name fit-width-to-contents'>{song_name}</span>
      </div>
      <div className='date-posted-container'>
        <div className='date-posted'>{date_posted}</div>
      </div>
      <div className='tags-container'>
        <div className='tags fit-width-to-contents'>{tag}</div>
      </div>
    </div>
  );
};

export default PlayerHead;
