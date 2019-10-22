/* eslint-disable camelcase */

const styles = require('./style/SongDisplay.module.css');

const UserComment = (props) => {
  // Destructure props
  const {
    songPlayerPixelWidth,
    currentSongAudio,
    comment,
    userImages,
    commentKey,
  } = props;
  const {time_stamp} = comment;

  return (
    <div
      className={styles['user-image']}
      style={{
        // Set 'left' to 0 if song audio isn't ready/loaded
        left:
          songPlayerPixelWidth * currentSongAudio.duration
            ? songPlayerPixelWidth * (time_stamp / currentSongAudio.duration)
            : 0,
        backgroundImage: userImages[time_stamp % userImages.length],
      }}
    ></div>
  );
};

export default UserComment;
