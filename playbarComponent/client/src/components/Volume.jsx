import React, { Component } from 'react';
import styles from '../styles/Volume.module.css';
// class Volume extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       hoverState: false
//     };
//   }
//   toggleVolume() {
//     this.setState({
//       hoverState: !this.state.hoverState
//     });
//     console.log('toggled');
//   }

//   handleMute() {
//     this.setState({ mute: !this.state.mute }, () => {
//       // this.state.mute
//       //   ? (this.state.currentSong.muted = true)
//       //   : (this.state.currentSong.muted = false);
//       var volume = document.getElementById('volume-slider');
//       if (this.state.mute) {
//         this.state.currentSong.muted = true;
//         volume.value = 0;
//         this.state.currentSong.volume = 0;
//       } else {
//         this.state.currentSong.muted = false;
//         volume.value = this.state.volume;
//       }
//     });
//   }
var Volume = props => {
  const { mute, handleMute, toggleVolume, handleVolume, volume, hover } = props;
  return (
    <div
      className={styles.volumeContainer}
      onMouseEnter={toggleVolume}
      onMouseLeave={toggleVolume}
    >
      <div>
        <button className={styles.volumeSlider} onClick={handleMute}>
          {mute ? (
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTE4IDEwLjU4NGwtMi4yOTMtMi4yOTEtMS40MTQgMS40MTQgMi4yOTMgMi4yOTEtMi4yOTEgMi4yOTEgMS40MTQgMS40MTUgMi4yOTItMi4yOTIgMi4yOTQgMi4yOTIgMS40MTQtMS40MTUtMi4yOTMtMi4yOTEgMi4yOTEtMi4yOS0xLjQxNC0xLjQxNS0yLjI5MiAyLjI5MXpNNCA5aDQuMDAyTDEyIDV2MTRjLTIuNDQ2LTIuNjY3LTMuNzc4LTQtMy45OTgtNEg0Vjl6Ii8+PC9zdmc+Cg=="
              width="24"
              height="24"
              alt="submit"
            />
          ) : (
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTQgOWg0LjAwMkwxMiA1djE0Yy0yLjQ0Ni0yLjY2Ny0zLjc3OC00LTMuOTk4LTRINFY5em0xMCA0YTEgMSAwIDAgMCAwLTJWOWEzIDMgMCAwIDEgMCA2di0yeiIvPjwvc3ZnPgo="
              width="24"
              height="24"
              alt="submit"
            />
          )}
        </button>
      </div>

      {hover && (
        <div>
          <input
            type="range"
            id={styles.volumeSlider}
            min="0"
            max="1"
            step="0.1"
            onChange={handleVolume}
            defaultValue={volume}
          />
        </div>
      )}
    </div>
  );
};

export default Volume;
