import React, { Component } from 'react';
import Player from './Player.jsx';
import Description from './Description.jsx';
import Playlist from './Playlist.jsx';
import Modal from './Modal.jsx';
import axios from 'axios';
import styles from '../styles/App.module.css';

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
      currentTime: 0,
      timerInterval: null,
      durationList: null,
      duration: null,
      volume: 0.5,
      mutedVolume: 0,
      hoverState: false,
      muteState: false,
      loopState: false,
      shuffleState: false
    };

    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleShuffleToggle = this.handleShuffleToggle.bind(this);
    this.handleRepeatToggle = this.handleRepeatToggle.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.toggleVolume = this.toggleVolume.bind(this);
    this.handlePlayListPopup = this.handlePlayListPopup.bind(this);
    this.handleProgressBarSeek = this.handleProgressBarSeek.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleClosePopup = this.handleClosePopup.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.incrementTimer = this.incrementTimer.bind(this);
  }

  //initialize array of songs
  loadSongs() {
    let list = [];
    axios.get`http://ec2-18-189-170-126.us-east-2.compute.amazonaws.com:5002/query/getSong/${this.props.song_id}`()
      // `http://localhost:5002/query/getSong/${this.props.song_id}`
      .then(res => {
        list = res.data;
        console.log('getting data: ', res.data);
        let songsList = [];
        let artList = [];
        let artistList = [];
        let songNamesList = [];
        let duration = [];
        // for (let i = 0; i < list.length; i++) {
        for (let i = 0; i < list.length; i++) {
          let song = new Audio(list[i].songNameURL);

          artList.push(list[i].songArtURL);
          artistList.push(list[i].artistName);
          songsList.push(song);
          songNamesList.push(list[i].songName);
          duration.push(list[i].duration);
        }

        //   get 50x50
        for (let i = 0; i < artList.length; i++) {
          artList[i] = artList[i].replace(/500x500/g, '50x50');
        }
        var time = this.fancyTimeFormat(0);
        this.setState({
          currentList: songsList,
          currentSong: songsList[0],
          currentSongTitle: songNamesList[0],
          currentArtist: artistList[0],
          currentArt: artList[0],
          artList: artList,
          artistList: artistList,
          songNamesList: songNamesList,
          currentTime: time,
          duration: duration[0]
        });
      })
      .catch(err => {
        console.log('Could not load songs from db!');
      });

    // list = [
    //   {
    //     lengthString: 'Please choose a song first!',
    //     currentTime: 0,
    //     songName: 'All I Got',
    //     songNameURL:
    //       'https://5cloudaudio.s3-us-west-1.amazonaws.com/All_I_Got.mp3',
    //     artistName: 'Said The Sky',
    //     songArtURL:
    //       'https://i1.sndcdn.com/artworks-87d2dfb3-404e-46c4-a9c1-ca749b012f52-0-t50x50.jpg',
    //     duration: 366
    //   },
    //   {
    //     lengthString: 'Please choose a song first!',
    //     currentTime: 0,
    //     songName: 'Flicker',
    //     songNameURL:
    //       'https://5cloudaudio.s3-us-west-1.amazonaws.com/flicker.mp3',
    //     artistName: 'Porter Robinson',
    //     songArtURL:
    //       'https://i1.sndcdn.com/artworks-000376950786-x9c78f-t50x50.jpg',
    //     duration: 316
    //   },
    //   {
    //     lengthString: 'Please choose a song first!',
    //     currentTime: 0,
    //     songName: 'Say My Name',
    //     songNameURL:
    //       'https://5cloudaudio.s3-us-west-1.amazonaws.com/Say_My_Name.mp3',
    //     artistName: 'Odesza',
    //     songArtURL: 'https://i1.sndcdn.com/artworks-ILVTUNh2LAia-0-t50x50.jpg',
    //     duration: 266
    //   }
    // ];

    // let songsList = [];
    // let artList = [];
    // let artistList = [];
    // let songNamesList = [];
    // let duration = [];
    // for (let i = 0; i < list.length; i++) {
    //   let song = new Audio(list[i].songNameURL);
    //   // console.log('song: ', song);
    //   songsList.push(song);
    //   artList.push(list[i].songArtURL);
    //   console.log('art', list[i].songArtURL);
    //   artistList.push(list[i].artistName);
    //   songNamesList.push(list[i].songName);
    //   duration.push(list[i].duration);
    // }

    // var time = this.fancyTimeFormat(0);
    // // console.log('songsList: ', songsList);
    // this.setState(
    //   {
    //     currentList: songsList,
    //     currentSong: songsList[0],
    //     currentArt: artList[0],
    //     currentArtist: list[0].artistName,
    //     currentSongTitle: list[0].songName,
    //     artList: artList,
    //     artistList: artistList,
    //     songNamesList: songNamesList,
    //     currentTime: 0,
    //     duration: duration[0],
    //     durationList: duration
    //   },
    //   () => console.log(artList)
    // );
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

  handleTogglePlay() {
    this.setState({ play: !this.state.play }, () => {
      if (this.state.play) {
        console.log('playing');
        this.state.currentSong.play();
        this.startTimer();
      } else {
        console.log('stopped');
        this.state.currentSong.pause();
        this.stopTimer();
      }
    });
  }

  //TODO if time > 2 seconds, rewind song, else go to previous song.
  handlePrevious() {
    this.stopSong();
    let newIndex;
    if (this.state.currentList.indexOf(this.state.currentSong) - 1 < 0) {
      newIndex = 0;
    } else {
      newIndex = this.state.currentList.indexOf(this.state.currentSong) - 1;
    }

    let newSong = this.state.currentList[newIndex];
    let newSongName = this.state.songNamesList[newIndex];
    let newArtist = this.state.artistList[newIndex];
    let newArt = this.state.artList[newIndex];
    let newDuration = this.state.durationList[newIndex];

    this.setState(
      {
        currentSong: newSong,
        currentSongTitle: newSongName,
        currentArtist: newArtist,
        currentArt: newArt,
        duration: newDuration
      },
      () => this.state.currentSong.play()
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
    let newDuration = this.state.durationList[newIndex];

    this.setState(
      {
        currentSong: newSong,
        currentSongTitle: newSongName,
        currentArtist: newArtist,
        currentArt: newArt,
        duration: newDuration
      },

      () => this.state.currentSong.play()
    );
  }

  stopSong() {
    this.state.currentSong.pause();
  }

  handleVolume(event) {
    var volumeLevel = document.getElementsByClassName(styles.volumeSlider)[0];
    const mute = volumeLevel.value === '0' ? true : false;
    this.setState({
      volume: event.target.value,
      muteState: mute
    });
    this.state.currentSong.volume = this.state.volume;
  }

  toggleVolume() {
    this.setState({
      hoverState: !this.state.hoverState
    });
  }

  handleMute() {
    this.setState({ muteState: !this.state.muteState }, () => {
      var volume = document.getElementsByClassName(styles.volumeSlider)[0];

      if (this.state.muteState) {
        this.state.currentSong.muted = true;
        volume.value = 0;
        this.state.currentSong.volume = 0;
      } else {
        this.state.currentSong.muted = false;
        volume.value = this.state.volume;
      }
    });
  }

  handleShuffleToggle() {
    this.setState({ shuffleState: !this.state.shuffleState }, () => {
      this.state.shuffleState;
      //shuffle the list
    });
  }

  handleRepeatToggle() {
    this.setState({ loopState: !this.state.loopState }, () => {
      this.state.loopState
        ? (this.state.currentSong.loop = true)
        : (this.state.currentSong.loop = false);
    });
  }

  handleLike() {
    document.getElementById('like').onclick = function() {
      console.log('like clicked!');
      this.style.color = '#f50';
    };
  }

  handlePlayListPopup() {
    document.querySelector('.modal').style.display = 'block';
  }

  handleClosePopup() {
    document.querySelector('.modal').style.display = 'none';
  }

  handleProgressBarSeek(event) {
    var timeline = document.getElementsByClassName(styles.progressBar)[0];
    timeline.oninput = function() {
      //value/duration
      // let val = this.value / this.state.duration;
      // this.value = event.target.value;
      this.style.background =
        'linear-gradient(to right, #FFA500 0%, #FFA500 ' +
        this.value * 0.27 +
        '%, #fff ' +
        this.value * 0.27 +
        '%, white 100%)';
    };
    // Save currentTime in object
    var newSong = this.state.currentSong;
    newSong.currentTime = event.target.value;

    timeline.style.background =
      'linear-gradient(to right, #FFA500 0%, #FFA500 ' +
      this.value +
      '%, #fff ' +
      this.value +
      '%, white 100%)';
    console.log('timeline value', timeline.value);
    console.log('e value', event.target.value);

    this.setState({
      currentSong: newSong,
      currentTime: event.target.value
    });
  }

  incrementTimer() {
    const oldTime = this.state.currentSong.currentTime;
    // console.log('current songs current time', this.state.currentTime);

    var newTime = Math.floor(oldTime + 1);
    var formatted = this.fancyTimeFormat(newTime);

    this.setState({
      currentTime: newTime
    });
  }

  startTimer() {
    const timer = setInterval(this.incrementTimer, 1000);
    this.setState({
      timerInterval: timer
    });
  }

  stopTimer() {
    clearInterval(this.state.timerInterval);
  }

  render() {
    return (
      <div className={styles.navbar}>
        <Player
          play={this.state.play}
          previous={this.handlePrevious}
          togglePlay={this.handleTogglePlay}
          next={this.handleNext}
          shuffleToggle={this.handleShuffleToggle}
          loop={this.handleRepeatToggle}
          shuffleState={this.state.shuffleState}
          loopState={this.state.loopState}
        />

        <div className={styles.progressContainer}>
          <span className={styles.currentTime}>
            {this.fancyTimeFormat(this.state.currentTime)}
          </span>
          <input
            className={styles.progressBar}
            type="range"
            min="0"
            max={this.state.duration}
            value={this.state.currentTime}
            onChange={this.handleProgressBarSeek}
          />
          <span className={styles.songDuration}>
            {this.fancyTimeFormat(this.state.duration)}
          </span>
        </div>

        <div
          className={styles.volumeContainer}
          onMouseEnter={this.toggleVolume}
          onMouseLeave={this.toggleVolume}
        >
          <div>
            <button onClick={this.handleMute} className={styles.button}>
              {this.state.muteState ? (
                <img
                  className={styles.img}
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTE4IDEwLjU4NGwtMi4yOTMtMi4yOTEtMS40MTQgMS40MTQgMi4yOTMgMi4yOTEtMi4yOTEgMi4yOTEgMS40MTQgMS40MTUgMi4yOTItMi4yOTIgMi4yOTQgMi4yOTIgMS40MTQtMS40MTUtMi4yOTMtMi4yOTEgMi4yOTEtMi4yOS0xLjQxNC0xLjQxNS0yLjI5MiAyLjI5MXpNNCA5aDQuMDAyTDEyIDV2MTRjLTIuNDQ2LTIuNjY3LTMuNzc4LTQtMy45OTgtNEg0Vjl6Ii8+PC9zdmc+Cg=="
                  width="24"
                  height="24"
                  alt="submit"
                />
              ) : (
                <img
                  className={styles.img}
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTQgOWg0LjAwMkwxMiA1djE0Yy0yLjQ0Ni0yLjY2Ny0zLjc3OC00LTMuOTk4LTRINFY5em0xMCA0YTEgMSAwIDAgMCAwLTJWOWEzIDMgMCAwIDEgMCA2di0yeiIvPjwvc3ZnPgo="
                  width="24"
                  height="24"
                  alt="submit"
                />
              )}
            </button>
          </div>

          {this.state.hoverState && (
            <div>
              <input
                className={styles.volumeSlider}
                type="range"
                min="0"
                max="1"
                step="0.01"
                onChange={this.handleVolume}
                defaultValue={this.state.volume}
              />
            </div>
          )}
        </div>

        <Description
          currentArt={this.state.currentArt}
          currentArtist={this.state.currentArtist}
          currentSongTitle={this.state.currentSongTitle}
        />

        <Playlist
          like={this.handleLike}
          playListPopup={this.handlePlayListPopup}
        />

        <Modal closePopup={this.handleClosePopup} />
      </div>
    );
  }
}

export default App;
