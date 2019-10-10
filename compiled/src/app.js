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
      timerIntervalID: null
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
      )
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.querySelector('#app'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwiY3VycmVudFNvbmciLCJBdWRpbyIsImN1cnJlbnRTb25nQ3VycmVudFRpbWUiLCJzb25ncyIsImN1cnJlbnRTb25nSW5kZXgiLCJjdXJyZW50VGltZSIsInRpbWVySW50ZXJ2YWxJRCIsImNoYW5nZUN1cnJlbnRTb25nIiwiYmluZCIsImhhbmRsZVNvbmdDaG9pY2UiLCJjaG9vc2VDdXJyZW50U29uZyIsInBsYXlTb25nIiwicGF1c2VTb25nIiwiaW5jcmVtZW50VGltZXIiLCJzdGFydFRpbWVyIiwic3RvcFRpbWVyIiwibmV4dFNvbmdJbmRleCIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJuZXh0U29uZyIsInNldFN0YXRlIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsInNvbmdVUkwiLCJwbGF5IiwicGF1c2UiLCJNYXRoIiwiZmxvb3IiLCJzZXRJbnRlcnZhbCIsIklEIiwiY2xlYXJJbnRlcnZhbCIsInJlbmRlciIsIlJlYWN0RE9NIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSxHQUFOLFNBQWtCQyxNQUFNQyxTQUF4QixDQUFrQztBQUNoQ0MsY0FBWUMsS0FBWixFQUFtQjtBQUNqQixVQUFNQSxLQUFOOztBQUVBO0FBQ0EsU0FBS0MsS0FBTCxHQUFhO0FBQ1hDLG1CQUFhLElBQUlDLEtBQUosQ0FBVSxtQkFBVixDQURGO0FBRVhDLDhCQUF3QixDQUZiO0FBR1hDLGFBQU8sQ0FDTCxtQkFESyxFQUVMLHdCQUZLLEVBR0wsMEJBSEssQ0FISTtBQVFYQyx3QkFBa0IsQ0FSUDtBQVNYQyxtQkFBYSxDQVRGO0FBVVhDLHVCQUFpQjtBQVZOLEtBQWI7O0FBYUE7QUFDQSxTQUFLQyxpQkFBTCxHQUF5QixLQUFLQSxpQkFBTCxDQUF1QkMsSUFBdkIsQ0FB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QUtFO0FBQUE7QUFBQSxZQUFRLE9BQU9OLE1BQU0sQ0FBTixDQUFmO0FBQUE7QUFBQSxTQUxGO0FBTUU7QUFBQTtBQUFBLFlBQVEsT0FBT0EsTUFBTSxDQUFOLENBQWY7QUFBQTtBQUFBLFNBTkY7QUFPRTtBQUFBO0FBQUEsWUFBUSxPQUFPQSxNQUFNLENBQU4sQ0FBZjtBQUFBO0FBQUE7QUFQRixPQUpGO0FBYUU7QUFBQTtBQUFBLFVBQVEsSUFBRyxNQUFYLEVBQWtCLFNBQVMsS0FBS1EsUUFBaEM7QUFBQTtBQUFBLE9BYkY7QUFnQkU7QUFBQTtBQUFBLFVBQVEsSUFBRyxPQUFYLEVBQW1CLFNBQVMsS0FBS0MsU0FBakM7QUFBQTtBQUFBLE9BaEJGO0FBbUJFO0FBQUE7QUFBQSxVQUFLLElBQUcsdUJBQVI7QUFBQTtBQUMwQixhQUFLYixLQUFMLENBQVdNO0FBRHJDO0FBbkJGLEtBREY7QUF5QkQ7QUF4SCtCOztBQTJIbEM2QixTQUFTRCxNQUFULENBQWdCLG9CQUFDLEdBQUQsT0FBaEIsRUFBeUJFLFNBQVNDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBekIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAvLyBTZXQgc3RhdGUgLSBtb3N0bHkgcmV2b2x2ZXMgYXJvdW5kIGN1cnJlbnQgc29uZyBwbGF5aW5nXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGN1cnJlbnRTb25nOiBuZXcgQXVkaW8oJy4vQXNzZXRzL3NvbmcubXAzJyksXG4gICAgICBjdXJyZW50U29uZ0N1cnJlbnRUaW1lOiAwLFxuICAgICAgc29uZ3M6IFtcbiAgICAgICAgJy4vQXNzZXRzL3NvbmcubXAzJyxcbiAgICAgICAgJy4vQXNzZXRzL0FsbF9JX2dvdC5tcDMnLFxuICAgICAgICAnLi9Bc3NldHMvU2F5X015X05hbWUubXAzJyxcbiAgICAgIF0sXG4gICAgICBjdXJyZW50U29uZ0luZGV4OiAwLFxuICAgICAgY3VycmVudFRpbWU6IDAsXG4gICAgICB0aW1lckludGVydmFsSUQ6IG51bGwsXG4gICAgfTtcblxuICAgIC8vIEJpbmQgZnVuY3Rpb25zIHRvIHRoaXNcbiAgICB0aGlzLmNoYW5nZUN1cnJlbnRTb25nID0gdGhpcy5jaGFuZ2VDdXJyZW50U29uZy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU29uZ0Nob2ljZSA9IHRoaXMuaGFuZGxlU29uZ0Nob2ljZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2hvb3NlQ3VycmVudFNvbmcgPSB0aGlzLmNob29zZUN1cnJlbnRTb25nLmJpbmQodGhpcyk7XG4gICAgdGhpcy5wbGF5U29uZyA9IHRoaXMucGxheVNvbmcuYmluZCh0aGlzKTtcbiAgICB0aGlzLnBhdXNlU29uZyA9IHRoaXMucGF1c2VTb25nLmJpbmQodGhpcyk7XG4gICAgdGhpcy5pbmNyZW1lbnRUaW1lciA9IHRoaXMuaW5jcmVtZW50VGltZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YXJ0VGltZXIgPSB0aGlzLnN0YXJ0VGltZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0b3BUaW1lciA9IHRoaXMuc3RvcFRpbWVyLmJpbmQodGhpcyk7XG4gIH1cblxuICBjaGFuZ2VDdXJyZW50U29uZygpIHtcbiAgICAvLyBHZXQgbmV4dCBzb25nJ3MgaW5kZXhcbiAgICBjb25zdCBuZXh0U29uZ0luZGV4ID1cbiAgICAgICh0aGlzLnN0YXRlLmN1cnJlbnRTb25nSW5kZXggKyAxKSAlIHRoaXMuc3RhdGUuc29uZ3MubGVuZ3RoO1xuICAgIC8vIENyZWF0ZSBhdWRpbyBlbGVtZW50IGdpdmVuIHBhdGggZnJvbSBzdGF0ZVxuICAgIGNvbnNvbGUubG9nKGBuZXh0IHNvbmcgdXJsOiAke3RoaXMuc3RhdGUuc29uZ3NbbmV4dFNvbmdJbmRleF19YCk7XG4gICAgY29uc3QgbmV4dFNvbmcgPSBuZXcgQXVkaW8odGhpcy5zdGF0ZS5zb25nc1tuZXh0U29uZ0luZGV4XSk7XG4gICAgLy8gU2V0IG5ldyBzb25nIGFzIGN1cnJlbnQgc29uZyBpbiBzdGF0ZVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY3VycmVudFNvbmc6IG5leHRTb25nLFxuICAgICAgY3VycmVudFNvbmdJbmRleDogbmV4dFNvbmdJbmRleCxcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVNvbmdDaG9pY2UoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtjdXJyZW50U29uZzogbmV3IEF1ZGlvKGV2ZW50LnRhcmdldC52YWx1ZSl9KTtcbiAgfVxuXG4gIGNob29zZUN1cnJlbnRTb25nKHNvbmdVUkwpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGN1cnJlbnRTb25nOiBuZXcgQXVkaW8oc29uZ1VSTCksXG4gICAgfSk7XG4gIH1cblxuICBwbGF5U29uZygpIHtcbiAgICAvLyBTdGFydCBzb25nIHBsYXliYWNrXG4gICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudFNvbmcpIHtcbiAgICAgIHRoaXMuc3RhdGUuY3VycmVudFNvbmcucGxheSgpO1xuICAgICAgLy8gU3RhcnQgdGltZXJcbiAgICAgIHRoaXMuc3RhcnRUaW1lcigpO1xuICAgIH1cbiAgfVxuXG4gIHBhdXNlU29uZygpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5jdXJyZW50U29uZykge1xuICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50U29uZy5wYXVzZSgpO1xuICAgICAgLy8gU3RvcCB0aW1lclxuICAgICAgdGhpcy5zdG9wVGltZXIoKTtcbiAgICB9XG4gIH1cblxuICBpbmNyZW1lbnRUaW1lcigpIHtcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IHRoaXMuc3RhdGUuY3VycmVudFNvbmcuY3VycmVudFRpbWU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjdXJyZW50VGltZTogTWF0aC5mbG9vcihjdXJyZW50VGltZSArIDEpLFxuICAgIH0pO1xuICB9XG5cbiAgc3RhcnRUaW1lcigpIHtcbiAgICAvLyBVcGRhdGUgdGltZXIgZXZlcnkgc2Vjb25kXG4gICAgY29uc3QgdGltZXJJbnRlcnZhbElEID0gc2V0SW50ZXJ2YWwodGhpcy5pbmNyZW1lbnRUaW1lciwgMTAwMCk7XG4gICAgLy8gUmVjb3JkIGlkIG9mIGludGVydmFsXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB0aW1lckludGVydmFsSUQsXG4gICAgfSk7XG4gIH1cblxuICBzdG9wVGltZXIoKSB7XG4gICAgLy8gR2V0IElEIG9mIHRpbWVyIGN1cnJlbnRseSBydW5uaW5nXG4gICAgY29uc3QgSUQgPSB0aGlzLnN0YXRlLnRpbWVySW50ZXJ2YWxJRDtcbiAgICAvLyBDbGVhciBpbnRlcnZhbCB3aXRoIGlkXG4gICAgY2xlYXJJbnRlcnZhbChJRCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3NvbmdzfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9J3BsYXliYWNrQ2VudGVyJz5cbiAgICAgICAgey8qIDxidXR0b24gaWQ9J2Nob29zZVNvbmcnIG9uQ2xpY2s9e3RoaXMuY2hhbmdlQ3VycmVudFNvbmd9PlxuICAgICAgICAgIENoYW5nZSBTb25nXG4gICAgICAgIDwvYnV0dG9uPiAqL31cbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIG5hbWU9J3Nvbmctc2VsZWN0J1xuICAgICAgICAgIGlkPSdzb25nLXNlbGVjdCdcbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTb25nQ2hvaWNlfVxuICAgICAgICA+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT17c29uZ3NbMF19PkZsaWNrZXI8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtzb25nc1sxXX0+QWxsIEkgR290PC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT17c29uZ3NbMl19PlNheSBNeSBOYW1lPC9vcHRpb24+XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8YnV0dG9uIGlkPSdwbGF5JyBvbkNsaWNrPXt0aGlzLnBsYXlTb25nfT5cbiAgICAgICAgICBQbGF5XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGlkPSdwYXVzZScgb25DbGljaz17dGhpcy5wYXVzZVNvbmd9PlxuICAgICAgICAgIFBhdXNlXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8ZGl2IGlkPSdjdXJyZW50LXBsYXliYWNrLXRpbWUnPlxuICAgICAgICAgIEN1cnJlbnQgUGxheWJhY2sgdGltZToge3RoaXMuc3RhdGUuY3VycmVudFRpbWV9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcCcpKTtcbiJdfQ==