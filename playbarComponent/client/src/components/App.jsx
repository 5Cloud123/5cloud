import React, { Component } from 'react';
// import songFile from '../../../public/Assets/flicker.mp3';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentList: null,
      currentSong: null,
      play: false,
      currentTime: null,
      duration: null,
      volume: 0.0,
      loop: false,
      shuffle: false
    };

    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleShuffleToggle = this.handleShuffleToggle.bind(this);
    this.handleRepeatToggle = this.handleRepeatToggle.bind(this);
  }

  //initialize array of songs
  loadSongs() {
    let songsList = [];
    let list = this.props.songs;
    for (let i = 0; i < list.length; i++) {
      let song = new Audio(list[i].URL);
      console.log('song: ', song);
      songsList.push(song);
    }
    console.log('songsList: ', songsList);
    this.setState(
      {
        currentList: songsList,
        currentSong: songsList[0]
      },
      () => console.log('currentSong: ', this.state.currentSong)
    );
  }

  componentDidMount() {
    this.loadSongs();
  }

  /*NEED TO HANDLE
  Play states: Pause/Stop, Next, Previous
  DragStart/dragEnd (seekTo)
  Song ends -> play next song (Autoplay Toggle)
  */

  handleTogglePlay() {
    this.setState({ play: !this.state.play }, () => {
      this.state.play
        ? this.state.currentSong.play()
        : this.state.currentSong.pause();
    });
    console.log('volume: ', this.state.currentSong.volume);
    console.log('duration: ', this.state.currentSong.duration);
  }

  handlePrevious() {}

  handleNext() {
    this.stopSong();
    let newIndex = this.state.currentList.indexOf(this.state.currentSong) + 1;
    let newSong = this.state.currentList[newIndex];

    this.setState(
      {
        currentSong: newSong
      },
      () => this.state.currentSong.play()
    );
  }

  stopSong() {
    this.state.currentSong.pause();
  }

  handleVolume() {}

  handleShuffleToggle() {}

  handleRepeatToggle() {}

  render() {
    // var song = new Audio(this.state.currentSong);
    // console.log('song: ', song);
    return (
      <div>
        <h1>My awesome music player</h1>
        <button onClick={this.handlePrevious}>Previous</button>
        <button onClick={this.handleTogglePlay}>
          {this.state.play ? 'Pause' : 'Play'}
        </button>
        {/* <button onClick={() => song.play()}>Play</button> */}
        <button onClick={this.handleNext}>Next</button>
        <button onClick={this.handleShuffleToggle}>Shuffle</button>
        <button onClick={this.handleRepeatToggle}>Repeat</button>
      </div>
    );
  }
}

export default App;
