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
  }

  enablePlayCurrentSong() {
    song.addEventListener('canplay', () => {
      this.setState({ currentSongReadyToPlay: true });
    });
  }

  handleSongChoice(event) {
    const song = new Audio(event.target.value);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwiY3VycmVudFNvbmciLCJBdWRpbyIsImN1cnJlbnRTb25nQ3VycmVudFRpbWUiLCJzb25ncyIsImN1cnJlbnRTb25nSW5kZXgiLCJjdXJyZW50VGltZSIsInRpbWVySW50ZXJ2YWxJRCIsImN1cnJlbnRTb25nTGVuZ3RoU3RyaW5nIiwiY3VycmVudFNvbmdSZWFkeVRvUGxheSIsImhhbmRsZVNvbmdDaG9pY2UiLCJiaW5kIiwicmVjb3JkTmV4dFNvbmdzTGVuZ3RoIiwicGxheVNvbmciLCJwYXVzZVNvbmciLCJpbmNyZW1lbnRUaW1lciIsInN0YXJ0VGltZXIiLCJzdG9wVGltZXIiLCJlbmFibGVQbGF5Q3VycmVudFNvbmciLCJzb25nIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldFN0YXRlIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsImR1cmF0aW9uUmVtYWluaW5nIiwiTWF0aCIsImZsb29yIiwiZHVyYXRpb24iLCJsZW5ndGgiLCJob3VycyIsIm1pbnV0ZXMiLCJwbGF5IiwicGF1c2UiLCJzZXRJbnRlcnZhbCIsIklEIiwiY2xlYXJJbnRlcnZhbCIsInJlbmRlciIsIlJlYWN0RE9NIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSxHQUFOLFNBQWtCQyxNQUFNQyxTQUF4QixDQUFrQztBQUNoQ0MsY0FBWUMsS0FBWixFQUFtQjtBQUNqQixVQUFNQSxLQUFOOztBQUVBO0FBQ0EsU0FBS0MsS0FBTCxHQUFhO0FBQ1hDLG1CQUFhLElBQUlDLEtBQUosQ0FBVSxtQkFBVixDQURGO0FBRVhDLDhCQUF3QixDQUZiO0FBR1hDLGFBQU8sQ0FDTCxtQkFESyxFQUVMLHdCQUZLLEVBR0wsMEJBSEssQ0FISTtBQVFYQyx3QkFBa0IsQ0FSUDtBQVNYQyxtQkFBYSxDQVRG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eUJFLFNBQVNDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBekIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAvLyBTZXQgc3RhdGUgLSBtb3N0bHkgcmV2b2x2ZXMgYXJvdW5kIGN1cnJlbnQgc29uZyBwbGF5aW5nXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGN1cnJlbnRTb25nOiBuZXcgQXVkaW8oJy4vQXNzZXRzL3NvbmcubXAzJyksXG4gICAgICBjdXJyZW50U29uZ0N1cnJlbnRUaW1lOiAwLFxuICAgICAgc29uZ3M6IFtcbiAgICAgICAgJy4vQXNzZXRzL3NvbmcubXAzJyxcbiAgICAgICAgJy4vQXNzZXRzL0FsbF9JX2dvdC5tcDMnLFxuICAgICAgICAnLi9Bc3NldHMvU2F5X015X05hbWUubXAzJyxcbiAgICAgIF0sXG4gICAgICBjdXJyZW50U29uZ0luZGV4OiAwLFxuICAgICAgY3VycmVudFRpbWU6IDAsXG4gICAgICB0aW1lckludGVydmFsSUQ6IG51bGwsXG4gICAgICBjdXJyZW50U29uZ0xlbmd0aFN0cmluZzogJ1BsZWFzZSBjaG9vc2UgYSBzb25nIGZpcnN0IScsXG4gICAgICBjdXJyZW50U29uZ1JlYWR5VG9QbGF5OiBmYWxzZSxcbiAgICB9O1xuXG4gICAgLy8gQmluZCBmdW5jdGlvbnMgdG8gdGhpc1xuICAgIHRoaXMuaGFuZGxlU29uZ0Nob2ljZSA9IHRoaXMuaGFuZGxlU29uZ0Nob2ljZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMucmVjb3JkTmV4dFNvbmdzTGVuZ3RoID0gdGhpcy5yZWNvcmROZXh0U29uZ3NMZW5ndGguYmluZCh0aGlzKTtcbiAgICB0aGlzLnBsYXlTb25nID0gdGhpcy5wbGF5U29uZy5iaW5kKHRoaXMpO1xuICAgIHRoaXMucGF1c2VTb25nID0gdGhpcy5wYXVzZVNvbmcuYmluZCh0aGlzKTtcbiAgICB0aGlzLmluY3JlbWVudFRpbWVyID0gdGhpcy5pbmNyZW1lbnRUaW1lci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhcnRUaW1lciA9IHRoaXMuc3RhcnRUaW1lci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RvcFRpbWVyID0gdGhpcy5zdG9wVGltZXIuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGVuYWJsZVBsYXlDdXJyZW50U29uZygpIHtcbiAgICBzb25nLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXknLCAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtjdXJyZW50U29uZ1JlYWR5VG9QbGF5OiB0cnVlfSk7XG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVTb25nQ2hvaWNlKGV2ZW50KSB7XG4gICAgY29uc3Qgc29uZyA9IG5ldyBBdWRpbyhldmVudC50YXJnZXQudmFsdWUpO1xuICAgIHNvbmcuYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheScsICgpID0+IHtcbiAgICAgIHRoaXMucmVjb3JkTmV4dFNvbmdzTGVuZ3RoKHNvbmcpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3VycmVudFNvbmc6IHNvbmd9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlY29yZE5leHRTb25nc0xlbmd0aChzb25nKSB7XG4gICAgLy8gSXRlcmF0aXZlbHkgcmVkdWNlIGR1cmF0aW9uUmVtYWluaW5nIHRvIGNyZWF0ZSB0aW1lIHN0cmluZ1xuICAgIGxldCBkdXJhdGlvblJlbWFpbmluZyA9IE1hdGguZmxvb3Ioc29uZy5kdXJhdGlvbik7XG4gICAgbGV0IGxlbmd0aCA9ICcnO1xuICAgIC8vIElmIDErIGhvdXJzIGxvbmcsIHJlY29yZCB0aG9zZSBob3Vyc1xuICAgIGlmIChkdXJhdGlvblJlbWFpbmluZyA+IDM2MDApIHtcbiAgICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihkdXJhdGlvblJlbWFpbmluZyAvIDM2MDApO1xuICAgICAgbGVuZ3RoICs9IGAke2hvdXJzfTpgO1xuICAgICAgZHVyYXRpb25SZW1haW5pbmcgLT0gaG91cnMgKiAzNjAwO1xuICAgIH1cbiAgICAvLyBJZiAxKyBtaW51dGVzIGxvbmcsIHJlY29yZCB0aG9zZSBtaW51dGVzXG4gICAgaWYgKGR1cmF0aW9uUmVtYWluaW5nID4gNjApIHtcbiAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKGR1cmF0aW9uUmVtYWluaW5nIC8gNjApO1xuICAgICAgbGVuZ3RoICs9IGAke21pbnV0ZXN9OmA7XG4gICAgICBkdXJhdGlvblJlbWFpbmluZyAtPSBtaW51dGVzICogNjA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCArPSAnMDonO1xuICAgIH1cbiAgICAvLyBJZiAxKyBzZWNvbmRzIGxvbmcsIHJlY29yZCB0aG9zZSBzZWNvbmRzXG4gICAgaWYgKGR1cmF0aW9uUmVtYWluaW5nID4gMCkge1xuICAgICAgbGVuZ3RoICs9IGAke2R1cmF0aW9uUmVtYWluaW5nfWA7XG4gICAgfVxuICAgIC8vIFNhdmUgdG8gc3RhdGVcbiAgICB0aGlzLnNldFN0YXRlKHtjdXJyZW50U29uZ0xlbmd0aFN0cmluZzogbGVuZ3RofSk7XG4gIH1cblxuICBwbGF5U29uZygpIHtcbiAgICAvLyBTdGFydCBzb25nIHBsYXliYWNrXG4gICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudFNvbmcpIHtcbiAgICAgIHRoaXMuc3RhdGUuY3VycmVudFNvbmcucGxheSgpO1xuICAgICAgLy8gU3RhcnQgdGltZXJcbiAgICAgIHRoaXMuc3RhcnRUaW1lcigpO1xuICAgIH1cbiAgfVxuXG4gIHBhdXNlU29uZygpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5jdXJyZW50U29uZykge1xuICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50U29uZy5wYXVzZSgpO1xuICAgICAgLy8gU3RvcCB0aW1lclxuICAgICAgdGhpcy5zdG9wVGltZXIoKTtcbiAgICB9XG4gIH1cblxuICBpbmNyZW1lbnRUaW1lcigpIHtcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IHRoaXMuc3RhdGUuY3VycmVudFNvbmcuY3VycmVudFRpbWU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjdXJyZW50VGltZTogTWF0aC5mbG9vcihjdXJyZW50VGltZSArIDEpLFxuICAgIH0pO1xuICB9XG5cbiAgc3RhcnRUaW1lcigpIHtcbiAgICAvLyBVcGRhdGUgdGltZXIgZXZlcnkgc2Vjb25kXG4gICAgY29uc3QgdGltZXJJbnRlcnZhbElEID0gc2V0SW50ZXJ2YWwodGhpcy5pbmNyZW1lbnRUaW1lciwgMTAwMCk7XG4gICAgLy8gUmVjb3JkIGlkIG9mIGludGVydmFsXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB0aW1lckludGVydmFsSUQsXG4gICAgfSk7XG4gIH1cblxuICBzdG9wVGltZXIoKSB7XG4gICAgLy8gR2V0IElEIG9mIHRpbWVyIGN1cnJlbnRseSBydW5uaW5nXG4gICAgY29uc3QgSUQgPSB0aGlzLnN0YXRlLnRpbWVySW50ZXJ2YWxJRDtcbiAgICAvLyBDbGVhciBpbnRlcnZhbCB3aXRoIGlkXG4gICAgY2xlYXJJbnRlcnZhbChJRCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3NvbmdzfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9J3BsYXliYWNrQ2VudGVyJz5cbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIG5hbWU9J3Nvbmctc2VsZWN0J1xuICAgICAgICAgIGlkPSdzb25nLXNlbGVjdCdcbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTb25nQ2hvaWNlfVxuICAgICAgICA+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT17c29uZ3NbMF19PkZsaWNrZXI8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtzb25nc1sxXX0+QWxsIEkgR290PC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT17c29uZ3NbMl19PlNheSBNeSBOYW1lPC9vcHRpb24+XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8YnV0dG9uIGlkPSdwbGF5JyBvbkNsaWNrPXt0aGlzLnBsYXlTb25nfT5cbiAgICAgICAgICBQbGF5XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGlkPSdwYXVzZScgb25DbGljaz17dGhpcy5wYXVzZVNvbmd9PlxuICAgICAgICAgIFBhdXNlXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8ZGl2IGlkPSdjdXJyZW50LXBsYXliYWNrLXRpbWUnPlxuICAgICAgICAgIEN1cnJlbnQgUGxheWJhY2sgdGltZToge3RoaXMuc3RhdGUuY3VycmVudFRpbWV9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGlkPSdzb25nLWxlbmd0aCc+XG4gICAgICAgICAgU29uZyBMZW5ndGg6IHt0aGlzLnN0YXRlLmN1cnJlbnRTb25nTGVuZ3RoU3RyaW5nfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAnKSk7XG4iXX0=