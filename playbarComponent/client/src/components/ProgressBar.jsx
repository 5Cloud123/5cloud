import React from 'react';
import styles from '../styles/ProgressBar.module.css';

var ProgressBar = props => {
  const { currentTime, progressBarSeek, length } = props;
  return (
    <div className={styles.progressContainer}>
      <span id={styles.currentTime}>{currentTime}</span>
      <input
        id={styles.progressBar}
        type="range"
        min="0"
        max={length}
        defaultValue="0"
        onChange={progressBarSeek}
      />
      <span id={styles.songDuration}>{length}</span>
    </div>
  );
};

export default ProgressBar;
