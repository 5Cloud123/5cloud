class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSong: new Audio('./Assets/song.mp3'),
      currentSongCurrentTime: 0,
      songs: [
        './Assets/song.mp3',
        './Assets/All_I_got.mp3',
        './Assets/Say_My_Name.mp3',
      ],
      currentSongIndex: 0,
    };

    this.changeCurrentSong = this.changeCurrentSong.bind(this);
    this.playSong = this.playSong.bind(this);
    this.pauseSong = this.pauseSong.bind(this);
    this.handleSongChoice = this.handleSongChoice.bind(this);
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
    console.log('play pressed');
    if (this.state.currentSong) {
      this.state.currentSong.play();
    }
  }

  pauseSong() {
    if (this.state.currentSong) {
      this.state.currentSong.pause();
    }
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
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
