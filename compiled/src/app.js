class App extends React.Component {
  constructor(props) {
    super(props);

    // Set state - mostly revolves around current song playing
    this.state = {
      currentSong: null,
      songQueue: [],
      currentSongCurrentTime: 0,
      songs: ['./Assets/song.mp3', './Assets/All_I_got.mp3', './Assets/Say_My_Name.mp3'],
      currentSongIndex: 0,
      currentTime: 0,
      timerIntervalID: null,
      currentSongLengthString: 'Please choose a song first!',
      currentSongReadyToPlay: false
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
      const songURL = this.state.songs[i];
      console.log(songURL);
      this.enqueueSong(songURL);
    }
  }

  enqueueSong(songURL) {
    const song = new Audio(songURL);
    const songQueue = this.state.songQueue;
    songQueue.push(song);
    this.setState({
      songQueue
    });
  }

  playNextFromQueue() {
    // If queue has songs, get the next one
    if (this.state.songQueue.length) {
      const songQueue = this.state.songQueue.slice();
      console.log(songQueue);
      const song = songQueue.pop();
      this.setState(state => {
        return {
          currentSong: song,
          songQueue: songQueue,
          currentTime: 0,
          timerIntervalID: null,
          currentSongReadyToPlay: false
        };
      },
      // Then, update song length on page
      () => {
        this.recordNextSongsLength(song);
      });
    } else {
      alert('No songs in queue. Please enqueue some songs!');
    }
  }

  // TODO - incorporate this
  enablePlayCurrentSong() {
    song.addEventListener('canplay', () => {
      this.setState({ currentSongReadyToPlay: true });
    });
  }

  handleSongChoice(event) {
    const song = new Audio(event.target.value);
    console.log(song);
    song.addEventListener('canplay', () => {
      this.recordNextSongsLength(song);
      this.setState({ currentSong: song });
    });
  }

  recordNextSongsLength(song) {
    // Iteratively reduce durationRemaining to create time string
    let durationRemaining = Math.floor(song.duration);
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
      length += `${durationRemaining}`;
    }
    // Save to state
    this.setState({ currentSongLengthString: length });
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
      currentTime: Math.floor(currentTime + 1)
    });
  }

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
    const { songs } = this.state;
    return React.createElement(
      'div',
      { id: 'playbackCenter' },
      React.createElement(
        'select',
        {
          name: 'song-select',
          id: 'song-select',
          onChange: this.handleSongChoice
        },
        React.createElement('option', null),
        React.createElement(
          'option',
          { value: songs[0] },
          'Flicker'
        ),
        React.createElement(
          'option',
          { value: songs[1] },
          'All I Got'
        ),
        React.createElement(
          'option',
          { value: songs[2] },
          'Say My Name'
        )
      ),
      React.createElement(
        'button',
        { id: 'play', onClick: this.playSong },
        'Play'
      ),
      React.createElement(
        'button',
        { id: 'pause', onClick: this.pauseSong },
        'Pause'
      ),
      React.createElement(
        'button',
        { id: 'next-song-btn', onClick: this.playNextFromQueue },
        'Next Song'
      ),
      React.createElement(
        'div',
        { id: 'current-playback-time' },
        'Current Playback time: ',
        this.state.currentTime
      ),
      React.createElement(
        'div',
        { id: 'song-length' },
        'Song Length: ',
        this.state.currentSongLengthString
      )
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.querySelector('#app'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwiY3VycmVudFNvbmciLCJzb25nUXVldWUiLCJjdXJyZW50U29uZ0N1cnJlbnRUaW1lIiwic29uZ3MiLCJjdXJyZW50U29uZ0luZGV4IiwiY3VycmVudFRpbWUiLCJ0aW1lckludGVydmFsSUQiLCJjdXJyZW50U29uZ0xlbmd0aFN0cmluZyIsImN1cnJlbnRTb25nUmVhZHlUb1BsYXkiLCJoYW5kbGVTb25nQ2hvaWNlIiwiYmluZCIsInJlY29yZE5leHRTb25nc0xlbmd0aCIsInBsYXlTb25nIiwicGF1c2VTb25nIiwiaW5jcmVtZW50VGltZXIiLCJzdGFydFRpbWVyIiwic3RvcFRpbWVyIiwicGxheU5leHRGcm9tUXVldWUiLCJlbnF1ZXVlU29uZyIsImNvbXBvbmVudERpZE1vdW50IiwiaSIsImxlbmd0aCIsInNvbmdVUkwiLCJjb25zb2xlIiwibG9nIiwic29uZyIsIkF1ZGlvIiwicHVzaCIsInNldFN0YXRlIiwic2xpY2UiLCJwb3AiLCJhbGVydCIsImVuYWJsZVBsYXlDdXJyZW50U29uZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInRhcmdldCIsInZhbHVlIiwiZHVyYXRpb25SZW1haW5pbmciLCJNYXRoIiwiZmxvb3IiLCJkdXJhdGlvbiIsImhvdXJzIiwibWludXRlcyIsInBsYXkiLCJwYXVzZSIsInNldEludGVydmFsIiwiSUQiLCJjbGVhckludGVydmFsIiwicmVuZGVyIiwiUmVhY3RET00iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLEdBQU4sU0FBa0JDLE1BQU1DLFNBQXhCLENBQWtDO0FBQ2hDQyxjQUFZQyxLQUFaLEVBQW1CO0FBQ2pCLFVBQU1BLEtBQU47O0FBRUE7QUFDQSxTQUFLQyxLQUFMLEdBQWE7QUFDWEMsbUJBQWEsSUFE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O0FBY0U7QUFBQTtBQUFBLFVBQVEsSUFBRyxPQUFYLEVBQW1CLFNBQVMsS0FBS0MsU0FBakM7QUFBQTtBQUFBLE9BZEY7QUFpQkU7QUFBQTtBQUFBLFVBQVEsSUFBRyxlQUFYLEVBQTJCLFNBQVMsS0FBS0ksaUJBQXpDO0FBQUE7QUFBQSxPQWpCRjtBQW9CRTtBQUFBO0FBQUEsVUFBSyxJQUFHLHVCQUFSO0FBQUE7QUFDMEIsYUFBS2xCLEtBQUwsQ0FBV007QUFEckMsT0FwQkY7QUF1QkU7QUFBQTtBQUFBLFVBQUssSUFBRyxhQUFSO0FBQUE7QUFDZ0IsYUFBS04sS0FBTCxDQUFXUTtBQUQzQjtBQXZCRixLQURGO0FBNkJEO0FBOUwrQjs7QUFpTWxDMEMsU0FBU0QsTUFBVCxDQUFnQixvQkFBQyxHQUFELE9BQWhCLEVBQXlCRSxTQUFTQyxhQUFULENBQXVCLE1BQXZCLENBQXpCIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgLy8gU2V0IHN0YXRlIC0gbW9zdGx5IHJldm9sdmVzIGFyb3VuZCBjdXJyZW50IHNvbmcgcGxheWluZ1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjdXJyZW50U29uZzogbnVsbCxcbiAgICAgIHNvbmdRdWV1ZTogW10sXG4gICAgICBjdXJyZW50U29uZ0N1cnJlbnRUaW1lOiAwLFxuICAgICAgc29uZ3M6IFtcbiAgICAgICAgJy4vQXNzZXRzL3NvbmcubXAzJyxcbiAgICAgICAgJy4vQXNzZXRzL0FsbF9JX2dvdC5tcDMnLFxuICAgICAgICAnLi9Bc3NldHMvU2F5X015X05hbWUubXAzJyxcbiAgICAgIF0sXG4gICAgICBjdXJyZW50U29uZ0luZGV4OiAwLFxuICAgICAgY3VycmVudFRpbWU6IDAsXG4gICAgICB0aW1lckludGVydmFsSUQ6IG51bGwsXG4gICAgICBjdXJyZW50U29uZ0xlbmd0aFN0cmluZzogJ1BsZWFzZSBjaG9vc2UgYSBzb25nIGZpcnN0IScsXG4gICAgICBjdXJyZW50U29uZ1JlYWR5VG9QbGF5OiBmYWxzZSxcbiAgICB9O1xuXG4gICAgLy8gQmluZCBmdW5jdGlvbnMgdG8gdGhpc1xuICAgIHRoaXMuaGFuZGxlU29uZ0Nob2ljZSA9IHRoaXMuaGFuZGxlU29uZ0Nob2ljZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMucmVjb3JkTmV4dFNvbmdzTGVuZ3RoID0gdGhpcy5yZWNvcmROZXh0U29uZ3NMZW5ndGguYmluZCh0aGlzKTtcbiAgICB0aGlzLnBsYXlTb25nID0gdGhpcy5wbGF5U29uZy5iaW5kKHRoaXMpO1xuICAgIHRoaXMucGF1c2VTb25nID0gdGhpcy5wYXVzZVNvbmcuYmluZCh0aGlzKTtcbiAgICB0aGlzLmluY3JlbWVudFRpbWVyID0gdGhpcy5pbmNyZW1lbnRUaW1lci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhcnRUaW1lciA9IHRoaXMuc3RhcnRUaW1lci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RvcFRpbWVyID0gdGhpcy5zdG9wVGltZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnBsYXlOZXh0RnJvbVF1ZXVlID0gdGhpcy5wbGF5TmV4dEZyb21RdWV1ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZW5xdWV1ZVNvbmcgPSB0aGlzLmVucXVldWVTb25nLmJpbmQodGhpcyk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvLyBFbnF1ZXVlIGFsbCBzb25nc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGF0ZS5zb25ncy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc29uZ1VSTCA9IHRoaXMuc3RhdGUuc29uZ3NbaV07XG4gICAgICBjb25zb2xlLmxvZyhzb25nVVJMKTtcbiAgICAgIHRoaXMuZW5xdWV1ZVNvbmcoc29uZ1VSTCk7XG4gICAgfVxuICB9XG5cbiAgZW5xdWV1ZVNvbmcoc29uZ1VSTCkge1xuICAgIGNvbnN0IHNvbmcgPSBuZXcgQXVkaW8oc29uZ1VSTCk7XG4gICAgY29uc3Qgc29uZ1F1ZXVlID0gdGhpcy5zdGF0ZS5zb25nUXVldWU7XG4gICAgc29uZ1F1ZXVlLnB1c2goc29uZyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzb25nUXVldWUsXG4gICAgfSk7XG4gIH1cblxuICBwbGF5TmV4dEZyb21RdWV1ZSgpIHtcbiAgICAvLyBJZiBxdWV1ZSBoYXMgc29uZ3MsIGdldCB0aGUgbmV4dCBvbmVcbiAgICBpZiAodGhpcy5zdGF0ZS5zb25nUXVldWUubGVuZ3RoKSB7XG4gICAgICBjb25zdCBzb25nUXVldWUgPSB0aGlzLnN0YXRlLnNvbmdRdWV1ZS5zbGljZSgpO1xuICAgICAgY29uc29sZS5sb2coc29uZ1F1ZXVlKTtcbiAgICAgIGNvbnN0IHNvbmcgPSBzb25nUXVldWUucG9wKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICAoc3RhdGUpID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY3VycmVudFNvbmc6IHNvbmcsXG4gICAgICAgICAgICBzb25nUXVldWU6IHNvbmdRdWV1ZSxcbiAgICAgICAgICAgIGN1cnJlbnRUaW1lOiAwLFxuICAgICAgICAgICAgdGltZXJJbnRlcnZhbElEOiBudWxsLFxuICAgICAgICAgICAgY3VycmVudFNvbmdSZWFkeVRvUGxheTogZmFsc2UsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8gVGhlbiwgdXBkYXRlIHNvbmcgbGVuZ3RoIG9uIHBhZ2VcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVjb3JkTmV4dFNvbmdzTGVuZ3RoKHNvbmcpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydCgnTm8gc29uZ3MgaW4gcXVldWUuIFBsZWFzZSBlbnF1ZXVlIHNvbWUgc29uZ3MhJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETyAtIGluY29ycG9yYXRlIHRoaXNcbiAgZW5hYmxlUGxheUN1cnJlbnRTb25nKCkge1xuICAgIHNvbmcuYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheScsICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2N1cnJlbnRTb25nUmVhZHlUb1BsYXk6IHRydWV9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVNvbmdDaG9pY2UoZXZlbnQpIHtcbiAgICBjb25zdCBzb25nID0gbmV3IEF1ZGlvKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgY29uc29sZS5sb2coc29uZyk7XG4gICAgc29uZy5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5JywgKCkgPT4ge1xuICAgICAgdGhpcy5yZWNvcmROZXh0U29uZ3NMZW5ndGgoc29uZyk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtjdXJyZW50U29uZzogc29uZ30pO1xuICAgIH0pO1xuICB9XG5cbiAgcmVjb3JkTmV4dFNvbmdzTGVuZ3RoKHNvbmcpIHtcbiAgICAvLyBJdGVyYXRpdmVseSByZWR1Y2UgZHVyYXRpb25SZW1haW5pbmcgdG8gY3JlYXRlIHRpbWUgc3RyaW5nXG4gICAgbGV0IGR1cmF0aW9uUmVtYWluaW5nID0gTWF0aC5mbG9vcihzb25nLmR1cmF0aW9uKTtcbiAgICBsZXQgbGVuZ3RoID0gJyc7XG4gICAgLy8gSWYgMSsgaG91cnMgbG9uZywgcmVjb3JkIHRob3NlIGhvdXJzXG4gICAgaWYgKGR1cmF0aW9uUmVtYWluaW5nID4gMzYwMCkge1xuICAgICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKGR1cmF0aW9uUmVtYWluaW5nIC8gMzYwMCk7XG4gICAgICBsZW5ndGggKz0gYCR7aG91cnN9OmA7XG4gICAgICBkdXJhdGlvblJlbWFpbmluZyAtPSBob3VycyAqIDM2MDA7XG4gICAgfVxuICAgIC8vIElmIDErIG1pbnV0ZXMgbG9uZywgcmVjb3JkIHRob3NlIG1pbnV0ZXNcbiAgICBpZiAoZHVyYXRpb25SZW1haW5pbmcgPiA2MCkge1xuICAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoZHVyYXRpb25SZW1haW5pbmcgLyA2MCk7XG4gICAgICBsZW5ndGggKz0gYCR7bWludXRlc306YDtcbiAgICAgIGR1cmF0aW9uUmVtYWluaW5nIC09IG1pbnV0ZXMgKiA2MDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoICs9ICcwOic7XG4gICAgfVxuICAgIC8vIElmIDErIHNlY29uZHMgbG9uZywgcmVjb3JkIHRob3NlIHNlY29uZHNcbiAgICBpZiAoZHVyYXRpb25SZW1haW5pbmcgPiAwKSB7XG4gICAgICBsZW5ndGggKz0gYCR7ZHVyYXRpb25SZW1haW5pbmd9YDtcbiAgICB9XG4gICAgLy8gU2F2ZSB0byBzdGF0ZVxuICAgIHRoaXMuc2V0U3RhdGUoe2N1cnJlbnRTb25nTGVuZ3RoU3RyaW5nOiBsZW5ndGh9KTtcbiAgfVxuXG4gIHBsYXlTb25nKCkge1xuICAgIC8vIFN0YXJ0IHNvbmcgcGxheWJhY2tcbiAgICBpZiAodGhpcy5zdGF0ZS5jdXJyZW50U29uZykge1xuICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50U29uZy5wbGF5KCk7XG4gICAgICAvLyBTdGFydCB0aW1lclxuICAgICAgdGhpcy5zdGFydFRpbWVyKCk7XG4gICAgfVxuICB9XG5cbiAgcGF1c2VTb25nKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTb25nKSB7XG4gICAgICB0aGlzLnN0YXRlLmN1cnJlbnRTb25nLnBhdXNlKCk7XG4gICAgICAvLyBTdG9wIHRpbWVyXG4gICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgIH1cbiAgfVxuXG4gIGluY3JlbWVudFRpbWVyKCkge1xuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gdGhpcy5zdGF0ZS5jdXJyZW50U29uZy5jdXJyZW50VGltZTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGN1cnJlbnRUaW1lOiBNYXRoLmZsb29yKGN1cnJlbnRUaW1lICsgMSksXG4gICAgfSk7XG4gIH1cblxuICBzdGFydFRpbWVyKCkge1xuICAgIC8vIFVwZGF0ZSB0aW1lciBldmVyeSBzZWNvbmRcbiAgICBjb25zdCB0aW1lckludGVydmFsSUQgPSBzZXRJbnRlcnZhbCh0aGlzLmluY3JlbWVudFRpbWVyLCAxMDAwKTtcbiAgICAvLyBSZWNvcmQgaWQgb2YgaW50ZXJ2YWxcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHRpbWVySW50ZXJ2YWxJRCxcbiAgICB9KTtcbiAgfVxuXG4gIHN0b3BUaW1lcigpIHtcbiAgICAvLyBHZXQgSUQgb2YgdGltZXIgY3VycmVudGx5IHJ1bm5pbmdcbiAgICBjb25zdCBJRCA9IHRoaXMuc3RhdGUudGltZXJJbnRlcnZhbElEO1xuICAgIC8vIENsZWFyIGludGVydmFsIHdpdGggaWRcbiAgICBjbGVhckludGVydmFsKElEKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7c29uZ3N9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD0ncGxheWJhY2tDZW50ZXInPlxuICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgbmFtZT0nc29uZy1zZWxlY3QnXG4gICAgICAgICAgaWQ9J3Nvbmctc2VsZWN0J1xuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNvbmdDaG9pY2V9XG4gICAgICAgID5cbiAgICAgICAgICA8b3B0aW9uPjwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3NvbmdzWzBdfT5GbGlja2VyPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT17c29uZ3NbMV19PkFsbCBJIEdvdDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3NvbmdzWzJdfT5TYXkgTXkgTmFtZTwvb3B0aW9uPlxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPGJ1dHRvbiBpZD0ncGxheScgb25DbGljaz17dGhpcy5wbGF5U29uZ30+XG4gICAgICAgICAgUGxheVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBpZD0ncGF1c2UnIG9uQ2xpY2s9e3RoaXMucGF1c2VTb25nfT5cbiAgICAgICAgICBQYXVzZVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBpZD0nbmV4dC1zb25nLWJ0bicgb25DbGljaz17dGhpcy5wbGF5TmV4dEZyb21RdWV1ZX0+XG4gICAgICAgICAgTmV4dCBTb25nXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8ZGl2IGlkPSdjdXJyZW50LXBsYXliYWNrLXRpbWUnPlxuICAgICAgICAgIEN1cnJlbnQgUGxheWJhY2sgdGltZToge3RoaXMuc3RhdGUuY3VycmVudFRpbWV9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGlkPSdzb25nLWxlbmd0aCc+XG4gICAgICAgICAgU29uZyBMZW5ndGg6IHt0aGlzLnN0YXRlLmN1cnJlbnRTb25nTGVuZ3RoU3RyaW5nfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAnKSk7XG4iXX0=