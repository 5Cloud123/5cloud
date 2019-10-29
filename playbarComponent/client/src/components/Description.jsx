import React from 'react';
import styles from '../styles/Description.module.css';

var Description = props => {
  const { currentArt, currentArtist, currentSongTitle } = props;
  return (
    <div className={styles.artContainer}>
      <img className={styles.albumArt} src={currentArt}></img>

      <div id={styles.artistName}>{currentArtist} </div>

      <div id={styles.songTitle}>{currentSongTitle} </div>
    </div>
  );
};

export default Description;
