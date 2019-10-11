class App extends React.Component {
  constructor(props) {
    super(props);

    // Set state - mostly revolves around current song playing
    this.state = {
      currentSongAudio: null,
      currentSongObj: {
        lengthString: 'Please choose a song first!',
        currentTime: 0,
        name: '',
        URL: '',
        artist: '',
      },
      songQueueAudio: [],
      songQueueObjects: [],
      songObjs: [
        {
          lengthString: 'Please choose a song first!',
          currentTime: 0,
          name: 'Flicker',
          URL: './Assets/flicker.mp3',
          artist: 'Porter Robinson',
        },
        {
          lengthString: 'Please choose a song first!',
          currentTime: 0,
          name: 'All I Got',
          URL: './Assets/All_I_got.mp3',
          artist: 'Said The Sky',
        },
        {
          lengthString: 'Please choose a song first!',
          currentTime: 0,
          name: 'Say My Name',
          URL: './Assets/Say_My_Name.mp3',
          artist: 'Odesza',
        },
      ],
      songs: [
        './Assets/flicker.mp3',
        './Assets/All_I_got.mp3',
        './Assets/Say_My_Name.mp3',
      ],
      timerIntervalID: null,
      currentSongReadyToPlay: false,
    };

    // Bind functions to this
    this.handleSongChoice = this.handleSongChoice.bind(this);
    this.recordNextSongsLength = this.recordNextSongsLength.bind(this);
    this.playSong = this.playSong.bind(this);
    this.pauseSong = this.pauseSong.bind(this);
    this.incrementTimer = this.incrementTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.playNextFromQueue = this.playNextFromQueue.bind(this);
    this.enqueueSong = this.enqueueSong.bind(this);
  }

  componentDidMount() {
    // Enqueue all songs
    for (let i = 0; i < this.state.songs.length; i++) {
      const songObj = this.state.songObjs[i];
      this.enqueueSong(songObj);
    }
  }

  enqueueSong(songObj) {
    const song = new Audio(songObj.URL);
    const {songQueueAudio, songQueueObjects} = this.state;
    songQueueAudio.push(song);
    songQueueObjects.push(songObj);
    this.setState({
      songQueueAudio,
      songQueueObjects,
    });
  }

  playNextFromQueue() {
    // If queue has songs, get the next one
    if (this.state.songQueueAudio.length) {
      const {songQueueAudio, songQueueObjects} = this.state;
      const songAudio = songQueueAudio.pop();
      const songObj = songQueueObjects.pop();
      this.setState(
        (state) => {
          return {
            currentSongAudio: songAudio,
            songQueueAudio: songQueueAudio,
            songQueueObjects: songQueueObjects,
            timerIntervalID: null,
            currentSongReadyToPlay: false,
            currentSongObj: songObj,
          };
        },
        // Then, update song length on page
        () => {
          this.recordNextSongsLength(songAudio);
        }
      );
    } else {
      alert('No songs in queue. Please enqueue some songs!');
    }
  }

  // TODO - incorporate this
  enablePlayCurrentSong() {
    song.addEventListener('canplay', () => {
      this.setState({currentSongReadyToPlay: true});
    });
  }

  handleSongChoice(event) {
    const songAudio = new Audio(event.target.value);
    songAudio.addEventListener('canplay', () => {
      this.recordNextSongsLength(songAudio);
      this.setState({currentSongAudio: songAudio});
    });
  }

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
    this.setState((state) => {
      const {currentSongObj} = state;
      currentSongObj.lengthString = length;
      return {
        currentSongObj,
      };
    });
  }

  playSong() {
    // Start song playback
    if (this.state.currentSongAudio) {
      this.state.currentSongAudio.play();
      // Start timer
      this.startTimer();
    }
  }

  pauseSong() {
    if (this.state.currentSongAudio) {
      this.state.currentSongAudio.pause();
      // Stop timer
      this.stopTimer();
    }
  }

  incrementTimer() {
    const currentTime = this.state.currentSongAudio.currentTime;
    this.setState((state) => {
      const {currentSongObj} = this.state;
      currentSongObj.currentTime = Math.floor(currentTime + 1);
      return {
        currentSongObj,
      };
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
    const {songObjs} = this.state;
    return (
      <div id='playbackCenter'>
        <select
          name='song-select'
          id='song-select'
          onChange={this.handleSongChoice}
        >
          <option></option>
          <option value={songObjs[0].URL}>{songObjs[0].name}</option>
          <option value={songObjs[1].URL}>{songObjs[1].name}</option>
          <option value={songObjs[2].URL}>{songObjs[2].name}</option>
        </select>
        <button id='play' onClick={this.playSong}>
          Play
        </button>
        <button id='pause' onClick={this.pauseSong}>
          Pause
        </button>
        <button id='next-song-btn' onClick={this.playNextFromQueue}>
          Next Song
        </button>
        <div id='currnet-song-name'>
          Current Song: {this.state.currentSongObj.name}
        </div>
        <div id='current-playback-time'>
          Current Playback time: {this.state.currentSongObj.currentTime}
        </div>
        <div id='song-length'>
          Song Length: {this.state.currentSongObj.lengthString}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
