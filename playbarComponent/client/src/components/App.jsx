import React, { Component } from 'react';
import Player from './Player.jsx';
import ProgressBar from './ProgressBar.jsx';
import Volume from './Volume.jsx';
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
    let artList = [];
    let artistList = [];
    let songNamesList = [];
    let duration = [];
    for (let i = 0; i < list.length; i++) {
      let song = new Audio(list[i].songNameURL);
      // console.log('song: ', song);
      songsList.push(song);
      artList.push(list[i].songArtURL);
      artistList.push(list[i].artistName);
      songNamesList.push(list[i].songName);
      duration.push(list[i].duration);
    }

    var time = this.fancyTimeFormat(0);
    // console.log('songsList: ', songsList);
    this.setState({
      currentList: songsList,
      currentSong: songsList[0],
      currentArt: artList[0],
      currentArtist: list[0].artist,
      currentSongTitle: list[0].name,
      artistList: artistList,
      songNamesList: songNamesList,
      currentTime: time,
      duration: duration[0]
    });
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

  //TODO
  handleVolume(event) {
    var volumeLevel = document.getElementById('volume-slider');
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
      // var volume = document.getElementById('volume-slider');
      // var volume = document.querySelector()
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

  //TODO
  handleShuffleToggle() {
    this.setState({ shuffleState: !this.state.shuffleState }, () => {
      this.state.shuffleState;
      //shuffle the list
    });
  }

  //TODO
  handleRepeatToggle() {
    this.setState({ loopState: !this.state.loopState }, () => {
      this.state.loopState
        ? (this.state.currentSong.loop = true)
        : (this.state.currentSong.loop = false);
    });
  }

  //TODO
  handleLike() {
    document.getElementById('like').onclick = function() {
      console.log('like clicked!');
      this.style.color = '#f50';
    };
  }

  //TODO
  handlePlayListPopup() {
    document.querySelector('.modal').style.display = 'block';
  }

  handleClosePopup() {
    document.querySelector('.modal').style.display = 'none';
  }

  //TODO
  handleProgressBarSeek(event) {
    var timeline = document.getElementById('progress-bar');
    // timeline.oninput = function() {
    //   this.style.background =
    //     'linear-gradient(to right, #FFA500 0%, #FFA500 ' +
    //     this.value +
    //     '%, #fff ' +
    //     this.value +
    //     '%, white 100%)';
    // };
    console.log(timeline.value);
    // this.setState({
    //   currentTime: event.target.value
    // });
    // this.state.currentSong.currentTime = this.state.currentTime;
    // console.log(this.state.currentTime);

    // const seekingSong = this.state.currentSong;

    // console.log(document.getElementById('progress-bar').value);
    // this.setState({
    //   currentSong: seekingSong,
    //   currentTime: event.target.value
    // });
  }

  incrementTimer() {
    const oldTime = this.state.currentSong.currentTime;
    console.log('current songs current time');
    var newTime = Math.floor(oldTime + 1);
    var formatted = this.fancyTimeFormat(newTime);

    this.setState({
      currentTime: formatted
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

        <ProgressBar
          currentTime={this.state.currentTime}
          progressBarSeek={this.handleProgressBarSeek}
          length={this.fancyTimeFormat(this.state.duration)}
        />

        <Volume
          mute={this.state.muteState}
          handleMute={this.handleMute}
          toggleVolume={this.toggleVolume}
          handleVolume={this.handleVolume}
          volume={this.state.volume}
          hover={this.state.hoverState}
        />

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
