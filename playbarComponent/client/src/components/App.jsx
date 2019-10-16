import React, { Component } from 'react';
import axios from 'axios';
// import ProgressBar from './ProgressBar.jsx';
// import songFile from '../../../public/Assets/flicker.mp3';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentList: null,
      currentSong: null,
      currentSongTitle: null,
      currentArtist: null,
      currentArt: null,
      artList: null,
      artistList: null,
      songNamesList: null,
      play: false,
      currentTime: null,
      timerIntervalID: null,
      duration: null,
      volume: 1.0,
      mute: false,
      loop: false,
      shuffle: false
    };

    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleShuffleToggle = this.handleShuffleToggle.bind(this);
    this.handleRepeatToggle = this.handleRepeatToggle.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.handlePlayListPopup = this.handlePlayListPopup.bind(this);
    this.handleProgressBarSeek = this.handleProgressBarSeek.bind(this);
  }

  //initialize array of songs
  loadSongs() {
    let list = [];
    // axios
    //   .get('/songs')
    //   .then(res => {
    //     list = res.data;
    //     let songsList = [];
    //     let artList = [];
    //     let artistList = [];
    //     let songNamesList = [];
    //     for (let i = 0; i < list.length; i++) {
    //       let song = new Audio(list[i].songNameURL);
    //       artList.push(list[i].songArtURL);
    //       artistList.push(list[i].artistName);
    //       songsList.push(song);
    //       songNamesList.push(list[i].songName);
    //     }

    //     //   get 50x50
    //     for (let i = 0; i < artList.length; i++) {
    //       artList[i] = artList[i].replace(/500x500/g, '50x50');
    //     }

    //     this.setState(
    //       {
    //         currentList: songsList,
    //         currentSong: songsList[0],
    //         currentSongTitle: songNamesList[0],
    //         currentArtist: artistList[0],
    //         currentArt: artList[0],
    //         artList: artList,
    //         artistList: artistList,
    //         songNamesList: songNamesList,
    //         currentTime: '0:00',
    //         duration: songsList[0].duration
    //       },
    //       () => {
    //         console.log('current song', this.state.currentSong);
    //         let d = this.state.currentSong.duration;
    //         console.log('d: ', d);
    //         let dur = this.fancyTimeFormat(this.state.currentSong.duration);
    //         console.log('duration: ', dur);
    //       }
    //     );
    //   })
    //   .catch(err => {
    //     console.log('Could not load songs from db!');
    //   });

    list = this.props.songs;
    let songsList = [];
    // let artList = [];
    let artistList = [];
    let songNamesList = [];
    for (let i = 0; i < list.length; i++) {
      let song = new Audio(list[i].songNameURL);
      console.log('song: ', song);
      songsList.push(song);
      // artList.push(list[i].songArtURL);
      artistList.push(list[i].artistName);
      songNamesList.push(list[i].songName);
    }
    console.log('songsList: ', songsList);
    this.setState(
      {
        currentList: songsList,
        currentSong: songsList[0],
        currentArtist: list[0].artist,
        currentSongTitle: list[0].name,
        artistList: artistList,
        songNamesList: songNamesList,
        currentTime: '0:00',
        duration: songsList[0].duration
      },
      () =>
        // console.log('currentSongduration: ', this.state.currentSong.duration)
        this.setState({
          duration: String(this.state.currentSong.duration)
        }),
      console.log(this.state.duration)
    );
  }

  componentDidMount() {
    this.loadSongs();
  }

  fancyTimeFormat(time) {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var formatted = '';

    if (hrs > 0) {
      formatted += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }

    formatted += '' + mins + ':' + (secs < 10 ? '0' : '');
    formatted += '' + secs;
    return formatted;
  }

  //TODO:
  /*
  PreviousBtn - First click rewinds song, second click goes to previous song.
  ShuffleBtn - shuffles playlist
  Loop - states: Loop single, loop playlist, no loop
  Starting/ending Timer
  DragStart/dragEnd Progress Bar (seekTo)
  Volume Hover Control slider
  Song ends -> play next song (Autoplay Toggle)
  */

  handleTogglePlay() {
    this.setState({ play: !this.state.play }, () => {
      this.state.play
        ? this.state.currentSong.play()
        : this.state.currentSong.pause();
    });
    console.log('volume: ', this.state.currentSong.volume); //1 = 100%
    console.log(
      'duration: ',
      this.fancyTimeFormat(this.state.currentSong.duration)
    ); //in seconds
    console.log();
  }

  //if time > 2 seconds, rewind song, else go to previous song.
  handlePrevious() {
    this.stopSong();
    let newIndex = this.state.currentList.indexOf(this.state.currentSong) - 1;
    let newSong = this.state.currentList[newIndex];
    let newSongName = this.state.songNamesList[newIndex];
    let newArtist = this.state.artistList[newIndex];
    let newArt = this.state.artList[newIndex];

    this.setState(
      {
        currentSong: newSong,
        currentSongTitle: newSongName,
        currentArtist: newArtist,
        currentArt: newArt
      }
      // ,
      // () => this.state.currentSong.play()
    );
  }

  handleNext() {
    this.stopSong();
    let newIndex;
    if (
      this.state.currentList.indexOf(this.state.currentSong) + 1 ===
      this.state.currentList.length
    ) {
      newIndex = 0;
    } else {
      newIndex = this.state.currentList.indexOf(this.state.currentSong) + 1;
    }

    let newSong = this.state.currentList[newIndex];
    let newSongName = this.state.songNamesList[newIndex];
    let newArtist = this.state.artistList[newIndex];
    let newArt = this.state.artList[newIndex];

    this.setState(
      {
        currentSong: newSong,
        currentSongTitle: newSongName,
        currentArtist: newArtist,
        currentArt: newArt
      }
      // ,
      // () => this.state.currentSong.play()
    );
  }

  stopSong() {
    this.state.currentSong.pause();
  }

  handleVolume() {}

  handleMute() {
    this.setState({ mute: !this.state.mute }, () => {
      this.state.mute
        ? (this.state.currentSong.muted = true)
        : (this.state.currentSong.muted = false);
    });
  }

  handleShuffleToggle() {
    this.setState({ shuffle: !this.state.shuffle }, () => {
      this.state.shuffle;
      //shuffle the list
    });
  }

  handleRepeatToggle() {
    this.setState({ loop: !this.state.loop }, () => {
      this.state.loop
        ? (this.state.currentSong.loop = true)
        : (this.state.currentSong.loop = false);
    });
  }

  handlePlayListPopup() {
    console.log('playlist clicked');
  }

  handleProgressBarSeek() {
    document.getElementById('progress-bar').oninput = function() {
      this.style.background =
        'linear-gradient(to right, #FFA500 0%, #FFA500 ' +
        this.value +
        '%, #fff ' +
        this.value +
        '%, white 100%)';
    };
    console.log(document.getElementById('progress-bar').value);
  }

  // Calculate a song's length in format MM:SS; save in state
  recordNextSongsLength(songAudio) {
    // Iteratively reduce durationRemaining to create time string
    let durationRemaining = Math.floor(songAudio.duration);
    let length = '';
    // If 1+ hours long, record those hours
    if (durationRemaining > 3600) {
      const hours = Math.floor(durationRemaining / 3600);
      length += `${hours}:`;
      durationRemaining -= hours * 3600;
    }
    // If 1+ minutes long, record those minutes
    if (durationRemaining > 60) {
      const minutes = Math.floor(durationRemaining / 60);
      length += `${minutes}:`;
      durationRemaining -= minutes * 60;
    } else {
      length += '0:';
    }
    // If 1+ seconds long, record those seconds
    if (durationRemaining > 0) {
      if (durationRemaining < 10) {
        // If sinlgle-digit, pad-
        length += JSON.stringify(durationRemaining).padStart(2, '0');
      } else {
        length += `${durationRemaining}`;
      }
    }
    // Save to state
    this.setState(state => {
      // const { currentSongObj } = state;
      // currentSongObj.lengthString = length;
      // return {
      //   currentSongObj
      // };
    });
  }

  incrementTimer() {}

  startTimer() {
    // Update timer every second
    const timerIntervalID = setInterval(this.incrementTimer, 1000);
    // Record id of interval
    this.setState({
      timerIntervalID
    });
  }

  stopTimer() {
    // Get ID of timer currently running
    const ID = this.state.timerIntervalID;
    // Clear interval with id
    clearInterval(ID);
  }

  render() {
    return (
      <div className="navbar">
        <div>
          <button onClick={this.handlePrevious}>
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTcgNmgydjEySDdWNnptMiA2bDggNlY2bC04IDZ6Ii8+PC9zdmc+Cg=="
              width="24"
              height="24"
              alt="submit"
            />
          </button>
          <button className="playBtn" onClick={this.handleTogglePlay}>
            {this.state.play ? (
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTYgMTloNFY1SDZ2MTR6bTgtMTR2MTRoNFY1aC00eiIvPjwvc3ZnPgo="
                width="24"
                height="24"
                alt="submit"
              />
            ) : (
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTggNXYxNGwxMS03eiIvPjwvc3ZnPgo="
                width="24"
                height="24"
                alt="submit"
              />
            )}
          </button>

          <button onClick={this.handleNext}>
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTcgMThsOC02LTgtNnYxMnptOC0xMnYxMmgyVjZoLTJ6Ii8+PC9zdmc+Cg=="
              width="24"
              height="24"
              alt="submit"
            />
          </button>
          <button onClick={this.handleShuffleToggle}>
            {this.state.shuffle ? (
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iI2Y1MCIgZD0iTTEzLjU4NiAxN2wtOC04SDNWN2gzLjQxNGw4IDhIMTd2MmgtMy40MTR6TTMgMTVoMi41ODZsMi4yMDctMi4yMDcgMS40MTQgMS40MTQtMi41MDEgMi41MDEtLjI5My4yOTJIM3YtMnptMTQtNmgtMi41ODZsLTIuMjA3IDIuMjA3LTEuNDE0LTEuNDE0TDEzLjU4NiA3SDE3djJ6bTQgN2wtNCAzdi02bDQgM3ptMC04bC00IDNWNWw0IDN6Ii8+PC9zdmc+Cg=="
                width="24"
                height="24"
                alt="submit"
              />
            ) : (
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTEzLjU4NiAxN2wtOC04SDNWN2gzLjQxNGw4IDhIMTd2MmgtMy40MTR6TTMgMTVoMi41ODZsMi4yMDctMi4yMDcgMS40MTQgMS40MTQtMi41MDEgMi41MDEtLjI5My4yOTJIM3YtMnptMTQtNmgtMi41ODZsLTIuMjA3IDIuMjA3LTEuNDE0LTEuNDE0TDEzLjU4NiA3SDE3djJ6bTQgN2wtNCAzdi02bDQgM3ptMC04bC00IDNWNWw0IDN6Ii8+PC9zdmc+Cg=="
                width="24"
                height="24"
                alt="submit"
              />
            )}
          </button>
          <button onClick={this.handleRepeatToggle}>
            {this.state.loop ? (
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iI2Y1MCIgZD0iTTExLjAyNyAxNmE0LjU1IDQuNTUgMCAwIDAgLjIzIDJIOUE2IDYgMCAxIDEgOSA2aDNWNGw0IDMtNCAzVjhIOWE0IDQgMCAxIDAgMCA4aDIuMDI3em03LjcyNS0yLjYxYTMuOTk3IDMuOTk3IDAgMCAwLTEuNjQ4LTQuNzkybDEuNzctMS4xOC4wMi4wMTdBNS45ODcgNS45ODcgMCAwIDEgMjEgMTJjMCAxLjMtLjQxMyAyLjUwMy0xLjExNiAzLjQ4NmE0LjQ5NiA0LjQ5NiAwIDAgMC0xLjEzMi0yLjA5NnoiLz48cGF0aCBmaWxsPSIjZjUwIiBkPSJNMTUuNSAyMGEzLjUgMy41IDAgMSAxIDAtNyAzLjUgMy41IDAgMCAxIDAgN3ptLS41LTV2NGgxdi00aC0xem0tMSAwdjFoMXYtMWgtMXoiLz48L3N2Zz4K"
                width="24"
                height="24"
                alt="submit"
              />
            ) : (
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTEyIDhIOWE0IDQgMCAxIDAgMCA4aDZhNCA0IDAgMCAwIDIuMTA0LTcuNDAzbDEuNzctMS4xOC4wMi4wMThBNiA2IDAgMCAxIDE1IDE4SDlBNiA2IDAgMSAxIDkgNmgzVjRsNCAzLTQgM1Y4eiIvPjwvc3ZnPgo="
                width="24"
                height="24"
                alt="submit"
              />
            )
            // <img
            // alt="repeat"
            // src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTEyIDhIOWE0IDQgMCAxIDAgMCA4aDZhNCA0IDAgMCAwIDIuMTA0LTcuNDAzbDEuNzctMS4xOC4wMi4wMThBNiA2IDAgMCAxIDE1IDE4SDlBNiA2IDAgMSAxIDkgNmgzVjRsNCAzLTQgM1Y4eiIvPjwvc3ZnPgo="
            // src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iI2Y1MCIgZD0iTTExLjAyNyAxNmE0LjU1IDQuNTUgMCAwIDAgLjIzIDJIOUE2IDYgMCAxIDEgOSA2aDNWNGw0IDMtNCAzVjhIOWE0IDQgMCAxIDAgMCA4aDIuMDI3em03LjcyNS0yLjYxYTMuOTk3IDMuOTk3IDAgMCAwLTEuNjQ4LTQuNzkybDEuNzctMS4xOC4wMi4wMTdBNS45ODcgNS45ODcgMCAwIDEgMjEgMTJjMCAxLjMtLjQxMyAyLjUwMy0xLjExNiAzLjQ4NmE0LjQ5NiA0LjQ5NiAwIDAgMC0xLjEzMi0yLjA5NnoiLz48cGF0aCBmaWxsPSIjZjUwIiBkPSJNMTUuNSAyMGEzLjUgMy41IDAgMSAxIDAtNyAzLjUgMy41IDAgMCAxIDAgN3ptLS41LTV2NGgxdi00aC0xem0tMSAwdjFoMXYtMWgtMXoiLz48L3N2Zz4K"
            // src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iI2Y1MCIgZD0iTTEyIDhIOWE0IDQgMCAxIDAgMCA4aDZhNCA0IDAgMCAwIDIuMTA0LTcuNDAzbDEuNzctMS4xOC4wMi4wMThBNiA2IDAgMCAxIDE1IDE4SDlBNiA2IDAgMSAxIDkgNmgzVjRsNCAzLTQgM1Y4eiIvPjwvc3ZnPgo="
            // />
            }
          </button>
        </div>

        {/* CURRENT TIME */}
        <div>
          <span id="current-time">{this.state.currentTime}</span>

          <input
            id="progress-bar"
            type="range"
            min="0"
            max="100"
            defaultValue="0"
            onInput={this.handleProgressBarSeek}
          />
          {/* DURATION */}
          <span id="song-duration">{this.state.duration}</span>
        </div>
        <div>
          <button onClick={this.handleMute} onMouseEnter={this.handleVolume}>
            {this.state.mute ? (
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

        <div>
          {' '}
          <span>
            {<img className="album-art" src={this.state.currentArt}></img>}
          </span>
          <span id="artist-name">{this.state.currentArtist} </span>
          <span id="song-title">{this.state.currentSongTitle}</span>
          {/* Like Button */}
          <button>
            {
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c3RhdHNfbGlrZXNfZ3JleTwvdGl0bGU+PHBhdGggZD0iTTEwLjgwNSAzYy0yLjAyIDAtMi44MDQgMi4zNDUtMi44MDQgMi4zNDVTNy4yMTMgMyA1LjE5NiAzQzMuNDk0IDMgMS43NDggNC4wOTYgMi4wMyA2LjUxNGMuMzQ0IDIuOTUzIDUuNzI1IDYuNDc5IDUuOTYzIDYuNDg3LjIzOC4wMDggNS43MzgtMy43MjIgNS45ODgtNi41QzE0LjE4OCA0LjIwMSAxMi41MDcgMyAxMC44MDUgM3oiIGZpbGw9IiMyMjIiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg=="
                width="24"
                height="24"
                alt="submit"
              />
            }
          </button>
          <button onClick={this.handlePlayListPopup}>
            {
              <svg id="playlist-button">
                <path
                  fill="#333"
                  className="playbackSoundBadge__queueIcon"
                  d="M6 11h12v2H6zM6 7h8v2H6zM6 15h12v2H6zM16 3v6l4-3z"
                  width="24"
                  height="24"
                ></path>
              </svg>
            }
          </button>
        </div>
      </div>
    );
  }
}

export default App;
