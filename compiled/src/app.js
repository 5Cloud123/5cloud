class App extends React.Component {
  constructor(props) {
    super(props);

    // Set state - mostly revolves around current song playing
    this.state = {
      currentSong: new Audio('./Assets/song.mp3'),
      currentSongCurrentTime: 0,
      songs: ['./Assets/song.mp3', './Assets/All_I_got.mp3', './Assets/Say_My_Name.mp3'],
      currentSongIndex: 0,
      currentTime: 0,
      timerIntervalID: null,
      currentSongLengthString: 'Please choose a song first!'
    };

    // Bind functions to this
    this.changeCurrentSong = this.changeCurrentSong.bind(this);
    this.handleSongChoice = this.handleSongChoice.bind(this);
    this.chooseCurrentSong = this.chooseCurrentSong.bind(this);
    this.recordNextSongsLength = this.recordNextSongsLength.bind(this);
    this.playSong = this.playSong.bind(this);
    this.pauseSong = this.pauseSong.bind(this);
    this.incrementTimer = this.incrementTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  // TODO - look for redundancy in changing song
  changeCurrentSong() {
    // Get next song's index
    const nextSongIndex = (this.state.currentSongIndex + 1) % this.state.songs.length;
    // Create audio element given path from state
    console.log(`next song url: ${this.state.songs[nextSongIndex]}`);
    const nextSong = new Audio(this.state.songs[nextSongIndex]);
    // Set new song as current song in state
    this.setState({
      currentSong: nextSong,
      currentSongIndex: nextSongIndex
    });
  }

  handleSongChoice(event) {
    this.setState({ currentSong: new Audio(event.target.value) });
  }

  chooseCurrentSong(songURL) {
    this.setState({
      currentSong: new Audio(songURL)
    });
  }

  recordNextSongsLength(song) {
    // Iteratively reduce durationRemaining to create time string
    let durationRemaining = Math.floor(song.duration);
    let length = '';
    // If 1+ hours long, record those hours
    if (durationRemaining > 3600) {
      const hours = Math.floor(durationRemaining / 3600);
      length += `${hours} hours, `;
      durationRemaining -= hours * 3600;
    }
    // If 1+ minutes long, record those minutes
    if (durationRemaining > 60) {
      const minutes = Math.floor(durationRemaining / 60);
      length += `${minutes} minutes, `;
      durationRemaining -= minutes * 3600;
    }
    // If 1+ seconds long, record those seconds
    if (durationRemaining > 0) {
      length += `${durationRemaining} seconds, `;
    }
    // Save to state
    this.setState({ currentSongCurrentTime: length });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwiY3VycmVudFNvbmciLCJBdWRpbyIsImN1cnJlbnRTb25nQ3VycmVudFRpbWUiLCJzb25ncyIsImN1cnJlbnRTb25nSW5kZXgiLCJjdXJyZW50VGltZSIsInRpbWVySW50ZXJ2YWxJRCIsImN1cnJlbnRTb25nTGVuZ3RoU3RyaW5nIiwiY2hhbmdlQ3VycmVudFNvbmciLCJiaW5kIiwiaGFuZGxlU29uZ0Nob2ljZSIsImNob29zZUN1cnJlbnRTb25nIiwicmVjb3JkTmV4dFNvbmdzTGVuZ3RoIiwicGxheVNvbmciLCJwYXVzZVNvbmciLCJpbmNyZW1lbnRUaW1lciIsInN0YXJ0VGltZXIiLCJzdG9wVGltZXIiLCJuZXh0U29uZ0luZGV4IiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsIm5leHRTb25nIiwic2V0U3RhdGUiLCJldmVudCIsInRhcmdldCIsInZhbHVlIiwic29uZ1VSTCIsInNvbmciLCJkdXJhdGlvblJlbWFpbmluZyIsIk1hdGgiLCJmbG9vciIsImR1cmF0aW9uIiwiaG91cnMiLCJtaW51dGVzIiwicGxheSIsInBhdXNlIiwic2V0SW50ZXJ2YWwiLCJJRCIsImNsZWFySW50ZXJ2YWwiLCJyZW5kZXIiLCJSZWFjdERPTSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsR0FBTixTQUFrQkMsTUFBTUMsU0FBeEIsQ0FBa0M7QUFDaENDLGNBQVlDLEtBQVosRUFBbUI7QUFDakIsVUFBTUEsS0FBTjs7QUFFQTtBQUNBLFNBQUtDLEtBQUwsR0FBYTtBQUNYQyxtQkFBYSxJQUFJQyxLQUFKLENBQVUsbUJBQVYsQ0FERjtBQUVYQyw4QkFBd0IsQ0FGYjtBQUdYQyxhQUFPLENBQ0wsbUJBREssRUFFTCx3QkFGSyxFQUdMLDBCQUhLLENBSEk7QUFRWEMsd0JB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LE9BSkY7QUFhRTtBQUFBO0FBQUEsVUFBUSxJQUFHLE1BQVgsRUFBa0IsU0FBUyxLQUFLVSxRQUFoQztBQUFBO0FBQUEsT0FiRjtBQWdCRTtBQUFBO0FBQUEsVUFBUSxJQUFHLE9BQVgsRUFBbUIsU0FBUyxLQUFLQyxTQUFqQztBQUFBO0FBQUEsT0FoQkY7QUFtQkU7QUFBQTtBQUFBLFVBQUssSUFBRyx1QkFBUjtBQUFBO0FBQzBCLGFBQUtmLEtBQUwsQ0FBV007QUFEckMsT0FuQkY7QUFzQkU7QUFBQTtBQUFBLFVBQUssSUFBRyxhQUFSO0FBQUE7QUFDZ0IsYUFBS04sS0FBTCxDQUFXUTtBQUQzQjtBQXRCRixLQURGO0FBNEJEO0FBdEorQjs7QUF5SmxDa0MsU0FBU0QsTUFBVCxDQUFnQixvQkFBQyxHQUFELE9BQWhCLEVBQXlCRSxTQUFTQyxhQUFULENBQXVCLE1BQXZCLENBQXpCIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgLy8gU2V0IHN0YXRlIC0gbW9zdGx5IHJldm9sdmVzIGFyb3VuZCBjdXJyZW50IHNvbmcgcGxheWluZ1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjdXJyZW50U29uZzogbmV3IEF1ZGlvKCcuL0Fzc2V0cy9zb25nLm1wMycpLFxuICAgICAgY3VycmVudFNvbmdDdXJyZW50VGltZTogMCxcbiAgICAgIHNvbmdzOiBbXG4gICAgICAgICcuL0Fzc2V0cy9zb25nLm1wMycsXG4gICAgICAgICcuL0Fzc2V0cy9BbGxfSV9nb3QubXAzJyxcbiAgICAgICAgJy4vQXNzZXRzL1NheV9NeV9OYW1lLm1wMycsXG4gICAgICBdLFxuICAgICAgY3VycmVudFNvbmdJbmRleDogMCxcbiAgICAgIGN1cnJlbnRUaW1lOiAwLFxuICAgICAgdGltZXJJbnRlcnZhbElEOiBudWxsLFxuICAgICAgY3VycmVudFNvbmdMZW5ndGhTdHJpbmc6ICdQbGVhc2UgY2hvb3NlIGEgc29uZyBmaXJzdCEnLFxuICAgIH07XG5cbiAgICAvLyBCaW5kIGZ1bmN0aW9ucyB0byB0aGlzXG4gICAgdGhpcy5jaGFuZ2VDdXJyZW50U29uZyA9IHRoaXMuY2hhbmdlQ3VycmVudFNvbmcuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVNvbmdDaG9pY2UgPSB0aGlzLmhhbmRsZVNvbmdDaG9pY2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNob29zZUN1cnJlbnRTb25nID0gdGhpcy5jaG9vc2VDdXJyZW50U29uZy5iaW5kKHRoaXMpO1xuICAgIHRoaXMucmVjb3JkTmV4dFNvbmdzTGVuZ3RoID0gdGhpcy5yZWNvcmROZXh0U29uZ3NMZW5ndGguYmluZCh0aGlzKTtcbiAgICB0aGlzLnBsYXlTb25nID0gdGhpcy5wbGF5U29uZy5iaW5kKHRoaXMpO1xuICAgIHRoaXMucGF1c2VTb25nID0gdGhpcy5wYXVzZVNvbmcuYmluZCh0aGlzKTtcbiAgICB0aGlzLmluY3JlbWVudFRpbWVyID0gdGhpcy5pbmNyZW1lbnRUaW1lci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhcnRUaW1lciA9IHRoaXMuc3RhcnRUaW1lci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RvcFRpbWVyID0gdGhpcy5zdG9wVGltZXIuYmluZCh0aGlzKTtcbiAgfVxuXG4gIC8vIFRPRE8gLSBsb29rIGZvciByZWR1bmRhbmN5IGluIGNoYW5naW5nIHNvbmdcbiAgY2hhbmdlQ3VycmVudFNvbmcoKSB7XG4gICAgLy8gR2V0IG5leHQgc29uZydzIGluZGV4XG4gICAgY29uc3QgbmV4dFNvbmdJbmRleCA9XG4gICAgICAodGhpcy5zdGF0ZS5jdXJyZW50U29uZ0luZGV4ICsgMSkgJSB0aGlzLnN0YXRlLnNvbmdzLmxlbmd0aDtcbiAgICAvLyBDcmVhdGUgYXVkaW8gZWxlbWVudCBnaXZlbiBwYXRoIGZyb20gc3RhdGVcbiAgICBjb25zb2xlLmxvZyhgbmV4dCBzb25nIHVybDogJHt0aGlzLnN0YXRlLnNvbmdzW25leHRTb25nSW5kZXhdfWApO1xuICAgIGNvbnN0IG5leHRTb25nID0gbmV3IEF1ZGlvKHRoaXMuc3RhdGUuc29uZ3NbbmV4dFNvbmdJbmRleF0pO1xuICAgIC8vIFNldCBuZXcgc29uZyBhcyBjdXJyZW50IHNvbmcgaW4gc3RhdGVcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGN1cnJlbnRTb25nOiBuZXh0U29uZyxcbiAgICAgIGN1cnJlbnRTb25nSW5kZXg6IG5leHRTb25nSW5kZXgsXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVTb25nQ2hvaWNlKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y3VycmVudFNvbmc6IG5ldyBBdWRpbyhldmVudC50YXJnZXQudmFsdWUpfSk7XG4gIH1cblxuICBjaG9vc2VDdXJyZW50U29uZyhzb25nVVJMKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjdXJyZW50U29uZzogbmV3IEF1ZGlvKHNvbmdVUkwpLFxuICAgIH0pO1xuICB9XG5cbiAgcmVjb3JkTmV4dFNvbmdzTGVuZ3RoKHNvbmcpIHtcbiAgICAvLyBJdGVyYXRpdmVseSByZWR1Y2UgZHVyYXRpb25SZW1haW5pbmcgdG8gY3JlYXRlIHRpbWUgc3RyaW5nXG4gICAgbGV0IGR1cmF0aW9uUmVtYWluaW5nID0gTWF0aC5mbG9vcihzb25nLmR1cmF0aW9uKTtcbiAgICBsZXQgbGVuZ3RoID0gJyc7XG4gICAgLy8gSWYgMSsgaG91cnMgbG9uZywgcmVjb3JkIHRob3NlIGhvdXJzXG4gICAgaWYgKGR1cmF0aW9uUmVtYWluaW5nID4gMzYwMCkge1xuICAgICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKGR1cmF0aW9uUmVtYWluaW5nIC8gMzYwMCk7XG4gICAgICBsZW5ndGggKz0gYCR7aG91cnN9IGhvdXJzLCBgO1xuICAgICAgZHVyYXRpb25SZW1haW5pbmcgLT0gaG91cnMgKiAzNjAwO1xuICAgIH1cbiAgICAvLyBJZiAxKyBtaW51dGVzIGxvbmcsIHJlY29yZCB0aG9zZSBtaW51dGVzXG4gICAgaWYgKGR1cmF0aW9uUmVtYWluaW5nID4gNjApIHtcbiAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKGR1cmF0aW9uUmVtYWluaW5nIC8gNjApO1xuICAgICAgbGVuZ3RoICs9IGAke21pbnV0ZXN9IG1pbnV0ZXMsIGA7XG4gICAgICBkdXJhdGlvblJlbWFpbmluZyAtPSBtaW51dGVzICogMzYwMDtcbiAgICB9XG4gICAgLy8gSWYgMSsgc2Vjb25kcyBsb25nLCByZWNvcmQgdGhvc2Ugc2Vjb25kc1xuICAgIGlmIChkdXJhdGlvblJlbWFpbmluZyA+IDApIHtcbiAgICAgIGxlbmd0aCArPSBgJHtkdXJhdGlvblJlbWFpbmluZ30gc2Vjb25kcywgYDtcbiAgICB9XG4gICAgLy8gU2F2ZSB0byBzdGF0ZVxuICAgIHRoaXMuc2V0U3RhdGUoe2N1cnJlbnRTb25nQ3VycmVudFRpbWU6IGxlbmd0aH0pO1xuICB9XG5cbiAgcGxheVNvbmcoKSB7XG4gICAgLy8gU3RhcnQgc29uZyBwbGF5YmFja1xuICAgIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTb25nKSB7XG4gICAgICB0aGlzLnN0YXRlLmN1cnJlbnRTb25nLnBsYXkoKTtcbiAgICAgIC8vIFN0YXJ0IHRpbWVyXG4gICAgICB0aGlzLnN0YXJ0VGltZXIoKTtcbiAgICB9XG4gIH1cblxuICBwYXVzZVNvbmcoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudFNvbmcpIHtcbiAgICAgIHRoaXMuc3RhdGUuY3VycmVudFNvbmcucGF1c2UoKTtcbiAgICAgIC8vIFN0b3AgdGltZXJcbiAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gICAgfVxuICB9XG5cbiAgaW5jcmVtZW50VGltZXIoKSB7XG4gICAgY29uc3QgY3VycmVudFRpbWUgPSB0aGlzLnN0YXRlLmN1cnJlbnRTb25nLmN1cnJlbnRUaW1lO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY3VycmVudFRpbWU6IE1hdGguZmxvb3IoY3VycmVudFRpbWUgKyAxKSxcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXJ0VGltZXIoKSB7XG4gICAgLy8gVXBkYXRlIHRpbWVyIGV2ZXJ5IHNlY29uZFxuICAgIGNvbnN0IHRpbWVySW50ZXJ2YWxJRCA9IHNldEludGVydmFsKHRoaXMuaW5jcmVtZW50VGltZXIsIDEwMDApO1xuICAgIC8vIFJlY29yZCBpZCBvZiBpbnRlcnZhbFxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdGltZXJJbnRlcnZhbElELFxuICAgIH0pO1xuICB9XG5cbiAgc3RvcFRpbWVyKCkge1xuICAgIC8vIEdldCBJRCBvZiB0aW1lciBjdXJyZW50bHkgcnVubmluZ1xuICAgIGNvbnN0IElEID0gdGhpcy5zdGF0ZS50aW1lckludGVydmFsSUQ7XG4gICAgLy8gQ2xlYXIgaW50ZXJ2YWwgd2l0aCBpZFxuICAgIGNsZWFySW50ZXJ2YWwoSUQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtzb25nc30gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPSdwbGF5YmFja0NlbnRlcic+XG4gICAgICAgIHsvKiA8YnV0dG9uIGlkPSdjaG9vc2VTb25nJyBvbkNsaWNrPXt0aGlzLmNoYW5nZUN1cnJlbnRTb25nfT5cbiAgICAgICAgICBDaGFuZ2UgU29uZ1xuICAgICAgICA8L2J1dHRvbj4gKi99XG4gICAgICAgIDxzZWxlY3RcbiAgICAgICAgICBuYW1lPSdzb25nLXNlbGVjdCdcbiAgICAgICAgICBpZD0nc29uZy1zZWxlY3QnXG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU29uZ0Nob2ljZX1cbiAgICAgICAgPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3NvbmdzWzBdfT5GbGlja2VyPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT17c29uZ3NbMV19PkFsbCBJIEdvdDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3NvbmdzWzJdfT5TYXkgTXkgTmFtZTwvb3B0aW9uPlxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPGJ1dHRvbiBpZD0ncGxheScgb25DbGljaz17dGhpcy5wbGF5U29uZ30+XG4gICAgICAgICAgUGxheVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBpZD0ncGF1c2UnIG9uQ2xpY2s9e3RoaXMucGF1c2VTb25nfT5cbiAgICAgICAgICBQYXVzZVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGRpdiBpZD0nY3VycmVudC1wbGF5YmFjay10aW1lJz5cbiAgICAgICAgICBDdXJyZW50IFBsYXliYWNrIHRpbWU6IHt0aGlzLnN0YXRlLmN1cnJlbnRUaW1lfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBpZD0nc29uZy1sZW5ndGgnPlxuICAgICAgICAgIFNvbmcgTGVuZ3RoOiB7dGhpcy5zdGF0ZS5jdXJyZW50U29uZ0xlbmd0aFN0cmluZ31cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwJykpO1xuIl19