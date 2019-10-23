import React from 'react';
import styles from '../styles/Description.module.css';

var Description = props => {
  const { currentArt, currentArtist, currentSongTitle } = props;
  return (
    <div className={styles.artContainer}>
      <img className={styles.albumArt} src={currentArt}></img>

      <span id={styles.artistName}>{currentArtist} </span>

      <span id={styles.songTitle}>{currentSongTitle} </span>
    </div>
  );
};

export default Description;
