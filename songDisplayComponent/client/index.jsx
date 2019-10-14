/* eslint-disable camelcase */
class App extends React.Component {
  constructor(props) {
    super(props);

    // Set state - mostly revolves around current song playing
    this.state = {
      // Song Audio is a JS Audio object
      currentSongAudio: null,
      // Store current song's metadata
      currentSongObj: {
        lengthString: 'Please choose a song first!',
        currentTime: 0,
        URL: './Assets/flicker.mp3',
        Id: 2,
        song_id: 'Song_00002',
        song_name: 'Flicker',
        artist_name: 'Porter Robinson',
        upload_time: 1470985200000,
        tag: '#electronic',
      },
      songQueueAudio: [],
      songQueueObjects: [],
      // TODO Song objects hard-coded for now; will be replaced with MySQL data
      songObjs: [
        {
          lengthString: 'Please choose a song first!',
          currentTime: 0,
          URL: './Assets/flicker.mp3',
          Id: 2,
          song_id: 'Song_00002',
          song_name: 'Flicker',
          artist_name: 'Porter Robinson',
          upload_time: 1470985200000,
          tag: '#electronic',
        },
        {
          lengthString: 'Please choose a song first!',
          currentTime: 0,
          URL: './Assets/All_I_got.mp3',
          Id: 1,
          song_id: 'Song_00001',
          song_name: 'All I Got',
          artist_name: 'Said the Sky',
          upload_time: 1494572400000,
          tag: '#electronic',
        },
        {
          lengthString: 'Please choose a song first!',
          currentTime: 0,
          URL: './Assets/Say_My_Name.mp3',
          Id: 3,
          song_id: 'Song_00003',
          song_name: 'Say My Name',
          artist_name: 'ODESZA',
          upload_time: 1485072000000,
          tag: '#electronic',
        },
      ],
      // Store ID of interval for timer
      timerIntervalID: null,
      playButtonState: 'play',
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

  // On mount, enqueue all current songs
  // TODO - replace hard-coded songs with songs from MySQL
  componentDidMount() {
    // Enqueue all songs
    for (let i = 0; i < this.state.songObjs.length; i++) {
      const songObj = this.state.songObjs[i];
      this.enqueueSong(songObj);
    }
  }

  // Add Audio objects of songs to queue; this preloads the songs for playback
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

  // Remove song from Audio and Obj queues; set to current song in state
  playNextFromQueue() {
    // If queue has songs, get the next one
    if (this.state.songQueueAudio.length) {
      const {songQueueAudio, songQueueObjects} = this.state;
      const songAudio = songQueueAudio.pop();
      const songObj = songQueueObjects.pop();
      // Stop current song's playback
      this.pauseSong();
      this.setState(
        (state) => {
          return {
            currentSongAudio: songAudio,
            songQueueAudio: songQueueAudio,
            songQueueObjects: songQueueObjects,
            timerIntervalID: null,
            currentSongObj: songObj,
          };
        },
        // Then, update song length on page
        () => {
          this.recordNextSongsLength(songAudio);
          // Start current song's playback
          this.playSong();
        }
      );
    } else {
      alert('No songs in queue. Please enqueue some songs!');
    }
  }

  getSongObj(songURL) {
    // Loop through objects in state, return one with correct url
    for (let i = 0; i < this.state.songObjs.length; i++) {
      if (this.state.songObjs[i].URL === songURL) {
        return this.state.songObjs[i];
      }
    }
  }

  // Handle user's selecting song from dropdown box
  handleSongChoice(event) {
    // Get song object for chosen song
    const songObj = this.getSongObj(event.target.value);
    const songAudio = new Audio(event.target.value);
    // Store song in state when it is buffered (ready to play)
    songAudio.addEventListener('canplay', () => {
      // Pause current song's playback
      this.pauseSong();
      this.recordNextSongsLength(songAudio);
      this.setState(
        {currentSongAudio: songAudio, currentSongObj: songObj},
        () => {
          // Start new song's playback
          this.playSong();
        }
      );
    });
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
    this.setState((state) => {
      const {currentSongObj} = state;
      currentSongObj.lengthString = length;
      return {
        currentSongObj,
      };
    });
  }

  // Start song playback if a song is selected
  playSong() {
    if (this.state.currentSongAudio) {
      // Change play button to pause button
      this.setState({playButtonState: 'pause'});
      this.state.currentSongAudio.play();
      // Start song timer
      this.startTimer();
    }
  }

  // Pause song playback if a song is selected
  pauseSong() {
    if (this.state.currentSongAudio) {
      // Change play button to pause button
      this.setState({playButtonState: 'play'});
      this.state.currentSongAudio.pause();
      // Stop song timer
      this.stopTimer();
    }
  }

  // Increment the current song's timer every second
  incrementTimer() {
    const currentTime = this.state.currentSongAudio.currentTime;
    this.setState((state) => {
      const {currentSongObj} = this.state;
      // Save timer as integer in state
      currentSongObj.currentTime = Math.floor(currentTime + 1);
      return {
        currentSongObj,
      };
    });
  }

  // Start playback timer for current song; save interval's ID in state
  startTimer() {
    // Update timer every second
    const timerIntervalID = setInterval(this.incrementTimer, 1000);
    // Record id of interval
    this.setState({
      timerIntervalID,
    });
  }

  // Stop the timer for current song playback; use timer interval ID in state
  stopTimer() {
    // Get ID of timer currently running
    const ID = this.state.timerIntervalID;
    // Clear interval with id
    clearInterval(ID);
  }

  // Render App component
  render() {
    const {songObjs, playButtonState} = this.state;
    const {
      name,
      currentTime,
      lengthString,
      artist_name,
      song_name,
    } = this.state.currentSongObj;
    return (
      <div>
        <div className='nav-bar'>
          {/* KEEP SELECTOR HERE FOR NOW - REMOVE WHEN WE CAN CHOOSE SONGS*/}
          <select
            name='song-select'
            id='song-select'
            onChange={this.handleSongChoice}
          >
            <option></option>
            {songObjs.map((songObj) => {
              return (
                <option value={songObj.URL} key={songObj.song_id}>
                  {songObj.song_name}
                </option>
              );
            })}
          </select>
        </div>

        <div id='playbackCenter' className='outer-player-panel'>
          <div className='inner-player-panel'>
            <div className='player-head'>
              {/* <a className='play-button' onClick={this.playSong}> */}
              <div
                className='play-button-wrapper'
                onClick={() => {
                  if (playButtonState === 'play') {
                    this.playSong();
                  } else {
                    this.pauseSong();
                  }
                }}
              >
                <div className={playButtonState + '-button'}></div>
              </div>
              <div className='artist-name-container'>
                <span className='artist-name fit-width-to-contents'>
                  {artist_name}
                </span>
              </div>
              <div className='song-name-container'>
                <span className='song-name fit-width-to-contents'>
                  {song_name}
                </span>
              </div>
              <div className='date-posted-container'>
                <div className='date-posted'>5 years ago</div>
              </div>
              <div className='tags-container'>
                <div className='tags fit-width-to-contents'># Electronic</div>
              </div>
            </div>
            <div className='album-art'>
              <img
                src='https://i.scdn.co/image/387b19d3bc6178b7429493f9fdf4f7c8c33aabc5'
                alt=''
                className='album-art'
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));

/*

        <button id='play' onClick={this.playSong}>
          Play
        </button>
        <button id='pause' onClick={this.pauseSong}>
          Pause
        </button>
        <button id='next-song-btn' onClick={this.playNextFromQueue}>
          Next Song
        </button>
        <div id='currnet-song-name'>Current Song: {name}</div>
        <div id='current-playback-time'>
          Current Playback Time: {currentTime}
        </div>
        <div id='song-length'>Song Length: {lengthString}</div>
          <div id='song-length'>Song Length: {lengthString}</div>


*/
