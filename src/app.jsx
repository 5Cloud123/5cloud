class App extends React.Component {
  constructor(props) {
    super(props);

    // Set state - mostly revolves around current song playing
    this.state = {
      currentSong: new Audio('./Assets/song.mp3'),
      currentSongCurrentTime: 0,
      songs: [
        './Assets/song.mp3',
        './Assets/All_I_got.mp3',
        './Assets/Say_My_Name.mp3',
      ],
      currentSongIndex: 0,
      currentTime: 0,
      timerIntervalID: null,
    };

    // Bind functions to this
    this.changeCurrentSong = this.changeCurrentSong.bind(this);
    this.handleSongChoice = this.handleSongChoice.bind(this);
    this.chooseCurrentSong = this.chooseCurrentSong.bind(this);
    this.playSong = this.playSong.bind(this);
    this.pauseSong = this.pauseSong.bind(this);
    this.incrementTimer = this.incrementTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  changeCurrentSong() {
    // Get next song's index
    const nextSongIndex =
      (this.state.currentSongIndex + 1) % this.state.songs.length;
    // Create audio element given path from state
    console.log(`next song url: ${this.state.songs[nextSongIndex]}`);
    const nextSong = new Audio(this.state.songs[nextSongIndex]);
    // Set new song as current song in state
    this.setState({
      currentSong: nextSong,
      currentSongIndex: nextSongIndex,
    });
  }

  handleSongChoice(event) {
    this.setState({currentSong: new Audio(event.target.value)});
  }

  chooseCurrentSong(songURL) {
    this.setState({
      currentSong: new Audio(songURL),
    });
  }

  playSong() {
    // Start song playback
    if (this.state.currentSong) {
      this.state.currentSong.play();
      // Start timer
      this.startTimer();
    }
  }

  pauseSong() {
    if (this.state.currentSong) {
      this.state.currentSong.pause();
      // Stop timer
      this.stopTimer();
    }
  }

  incrementTimer() {
    const currentTime = this.state.currentSong.currentTime;
    this.setState({
      currentTime: Math.floor(currentTime + 1),
    });
  }

  startTimer() {
    // Update timer every second
    const timerIntervalID = setInterval(this.incrementTimer, 1000);
    // Record id of interval
    this.setState({
      timerIntervalID,
    });
  }

  stopTimer() {
    // Get ID of timer currently running
    const ID = this.state.timerIntervalID;
    // Clear interval with id
    clearInterval(ID);
  }

  render() {
    const {songs} = this.state;
    return (
      <div id='playbackCenter'>
        {/* <button id='chooseSong' onClick={this.changeCurrentSong}>
          Change Song
        </button> */}
        <select
          name='song-select'
          id='song-select'
          onChange={this.handleSongChoice}
        >
          <option value={songs[0]}>Flicker</option>
          <option value={songs[1]}>All I Got</option>
          <option value={songs[2]}>Say My Name</option>
        </select>
        <button id='play' onClick={this.playSong}>
          Play
        </button>
        <button id='pause' onClick={this.pauseSong}>
          Pause
        </button>
        <div id='current-playback-time'>
          Current Playback time: {this.state.currentTime}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
