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
    return React.createElement(
      'div',
      {id: 'playbackCenter'},
      React.createElement(
        'button',
        {id: 'chooseSong', onClick: this.changeCurrentSong},
        'Change Song'
      ),
      React.createElement(
        'button',
        {id: 'play', onClick: this.playSong},
        'Play'
      ),
      React.createElement(
        'button',
        {id: 'pause', onClick: this.pauseSong},
        'Pause'
      )
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.querySelector('#app'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwiY3VycmVudFNvbmciLCJjdXJyZW50U29uZ0N1cnJlbnRUaW1lIiwiY2hhbmdlQ3VycmVudFNvbmciLCJiaW5kIiwicGxheVNvbmciLCJwYXVzZVNvbmciLCJzb25nQWRkcmVzcyIsInNldFN0YXRlIiwiQXVkaW8iLCJjb25zb2xlIiwibG9nIiwicGxheSIsInBhdXNlIiwicmVuZGVyIiwiUmVhY3RET00iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLEdBQU4sU0FBa0JDLE1BQU1DLFNBQXhCLENBQWtDO0FBQ2hDQyxjQUFZQyxLQUFaLEVBQW1CO0FBQ2pCLFVBQU1BLEtBQU47QUFDQSxTQUFLQyxLQUFMLEdBQWE7QUFDWEMsbUJBQWEsSUFERjtBQUVYQyw4QkFBd0I7QUFGYixLQUFiOztBQUtBLFNBQUtDLGlCQUFMLEdBQXlCLEtBQUtBLGlCQUFMLENBQXVCQyxJQUF2QixDQUE0QixJQUE1QixDQUF6QjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsS0FBS0EsUUFBTCxDQUFjRCxJQUFkLENBQW1CLElBQW5CLENBQWhCO0FBQ0EsU0FBS0UsU0FBTCxHQUFpQixLQUFLQSxTQUFMLENBQWVGLElBQWYsQ0FBb0IsSUFBcEIsQ0FBakI7QUFDRDs7QUFFREQsb0JBQWtCSSxjQUFjLFlBQWhDLEVBQThDO0FBQzVDLFNBQUtDLFFBQUwsQ0FBYztBQUNaUCxtQkFBYSxJQUFJUSxLQUFKLENBQVVGLFdBQVY7QUFERCxLQUFkO0FBR0Q7O0FBRURGLGFBQVc7QUFDVEssWUFBUUMsR0FBUixDQUFZLGNBQVo7QUFDQSxRQUFJLEtBQUtYLEtBQUwsQ0FBV0MsV0FBZixFQUE0QjtBQUMxQixXQUFLRCxLQUFMLENBQVdDLFdBQVgsQ0FBdUJXLElBQXZCO0FBQ0Q7QUFDRjs7QUFFRE4sY0FBWTtBQUNWLFFBQUksS0FBS04sS0FBTCxDQUFXQyxXQUFmLEVBQTRCO0FBQzFCLFdBQUtELEtBQUwsQ0FBV0MsV0FBWCxDQUF1QlksS0FBdkI7QUFDRDtBQUNGOztBQUVEQyxXQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBSyxJQUFHLGdCQUFSO0FBQ0U7QUFBQTtBQUFBLFVBQVEsSUFBRyxZQUFYLEVBQXdCLFNBQVMsS0FBS1gsaUJBQXRDO0FBQUE7QUFBQSxPQURGO0FBSUU7QUFBQTtBQUFBLFVBQVEsSUFBRyxNQUFYLEVBQWtCLFNBQVMsS0FBS0UsUUFBaEM7QUFBQTtBQUFBLE9BSkY7QUFPRTtBQUFBO0FBQUEsVUFBUSxJQUFHLE9BQVgsRUFBbUIsU0FBUyxLQUFLQyxTQUFqQztBQUFBO0FBQUE7QUFQRixLQURGO0FBYUQ7QUE5QytCOztBQWlEbENTLFNBQVNELE1BQVQsQ0FBZ0Isb0JBQUMsR0FBRCxPQUFoQixFQUF5QkUsU0FBU0MsYUFBVCxDQUF1QixNQUF2QixDQUF6QiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VycmVudFNvbmc6IG51bGwsXG4gICAgICBjdXJyZW50U29uZ0N1cnJlbnRUaW1lOiAwLFxuICAgIH07XG5cbiAgICB0aGlzLmNoYW5nZUN1cnJlbnRTb25nID0gdGhpcy5jaGFuZ2VDdXJyZW50U29uZy5iaW5kKHRoaXMpO1xuICAgIHRoaXMucGxheVNvbmcgPSB0aGlzLnBsYXlTb25nLmJpbmQodGhpcyk7XG4gICAgdGhpcy5wYXVzZVNvbmcgPSB0aGlzLnBhdXNlU29uZy5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY2hhbmdlQ3VycmVudFNvbmcoc29uZ0FkZHJlc3MgPSAnLi9zb25nLm1wMycpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGN1cnJlbnRTb25nOiBuZXcgQXVkaW8oc29uZ0FkZHJlc3MpLFxuICAgIH0pO1xuICB9XG5cbiAgcGxheVNvbmcoKSB7XG4gICAgY29uc29sZS5sb2coJ3BsYXkgcHJlc3NlZCcpO1xuICAgIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTb25nKSB7XG4gICAgICB0aGlzLnN0YXRlLmN1cnJlbnRTb25nLnBsYXkoKTtcbiAgICB9XG4gIH1cblxuICBwYXVzZVNvbmcoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudFNvbmcpIHtcbiAgICAgIHRoaXMuc3RhdGUuY3VycmVudFNvbmcucGF1c2UoKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9J3BsYXliYWNrQ2VudGVyJz5cbiAgICAgICAgPGJ1dHRvbiBpZD0nY2hvb3NlU29uZycgb25DbGljaz17dGhpcy5jaGFuZ2VDdXJyZW50U29uZ30+XG4gICAgICAgICAgQ2hhbmdlIFNvbmdcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gaWQ9J3BsYXknIG9uQ2xpY2s9e3RoaXMucGxheVNvbmd9PlxuICAgICAgICAgIFBsYXlcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gaWQ9J3BhdXNlJyBvbkNsaWNrPXt0aGlzLnBhdXNlU29uZ30+XG4gICAgICAgICAgUGF1c2VcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwJykpO1xuIl19
