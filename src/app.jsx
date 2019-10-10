class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSong: null,
      currentSongCurrentTime: 0,
    };

    this.changeCurrentSong = this.changeCurrentSong.bind(this);
    this.playSong = this.playSong.bind(this);
    this.pauseSong = this.pauseSong.bind(this);
  }

  changeCurrentSong(songAddress = './song.mp3') {
    this.setState({
      currentSong: new Audio(songAddress),
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
    return (
      <div id='playbackCenter'>
        <button id='chooseSong' onClick={this.changeCurrentSong}>
          Change Song
        </button>
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
