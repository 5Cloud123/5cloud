class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSong: new Audio('./Assets/song.mp3'),
      currentSongCurrentTime: 0,
      songs: ['./Assets/song.mp3', './Assets/All_I_got.mp3', './Assets/Say_My_Name.mp3'],
      currentSongIndex: 0
    };

    this.changeCurrentSong = this.changeCurrentSong.bind(this);
    this.playSong = this.playSong.bind(this);
    this.pauseSong = this.pauseSong.bind(this);
    this.handleSongChoice = this.handleSongChoice.bind(this);
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
      )
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.querySelector('#app'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwiY3VycmVudFNvbmciLCJBdWRpbyIsImN1cnJlbnRTb25nQ3VycmVudFRpbWUiLCJzb25ncyIsImN1cnJlbnRTb25nSW5kZXgiLCJjaGFuZ2VDdXJyZW50U29uZyIsImJpbmQiLCJwbGF5U29uZyIsInBhdXNlU29uZyIsImhhbmRsZVNvbmdDaG9pY2UiLCJuZXh0U29uZ0luZGV4IiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsIm5leHRTb25nIiwic2V0U3RhdGUiLCJldmVudCIsInRhcmdldCIsInZhbHVlIiwiY2hvb3NlQ3VycmVudFNvbmciLCJzb25nVVJMIiwicGxheSIsInBhdXNlIiwicmVuZGVyIiwiUmVhY3RET00iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLEdBQU4sU0FBa0JDLE1BQU1DLFNBQXhCLENBQWtDO0FBQ2hDQyxjQUFZQyxLQUFaLEVBQW1CO0FBQ2pCLFVBQU1BLEtBQU47QUFDQSxTQUFLQyxLQUFMLEdBQWE7QUFDWEMsbUJBQWEsSUFBSUMsS0FBSixDQUFVLG1CQUFWLENBREY7QUFFWEMsOEJBQXdCLENBRmI7QUFHWEMsYUFBTyxDQUNMLG1CQURLLEVBRUwsd0JBRkssRUFHTCwwQkFISyxDQUhJO0FBUVhDLHdCQUFrQjtBQVJQLEtBQWI7O0FBV0EsU0FBS0MsaUJBQUwsR0FBeUIsS0FBS0EsaUJBQUwsQ0FBdUJDLElBQXZCLENBQTRCLElBQTVCLENBQXpCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixLQUFLQSxRQUFMLENBQWNELElBQWQsQ0FBbUIsSUFBbkIsQ0FBaEI7QUFDQSxTQUFLRSxTQUFMLEdBQWlCLEtBQUtBLFNBQUwsQ0FBZUYsSUFBZixDQUFvQixJQUFwQixDQUFqQjtBQUNBLFNBQUtHLGdCQUFMLEdBQXdCLEtBQUtBLGdCQUFMLENBQXNCSCxJQUF0QixDQUEyQixJQUEzQixDQUF4QjtBQUNEOztBQUVERCxzQkFBb0I7QUFDbEI7QUFDQSxVQUFNSyxnQkFDSixDQUFDLEtBQUtYLEtBQUwsQ0FBV0ssZ0JBQVgsR0FBOEIsQ0FBL0IsSUFBb0MsS0FBS0wsS0FBTCxDQUFXSSxLQUFYLENBQWlCUSxNQUR2RDtBQUVBO0FBQ0FDLFlBQVFDLEdBQVIsQ0FBYSxrQkFBaUIsS0FBS2QsS0FBTCxDQUFXSSxLQUFYLENBQWlCTyxhQUFqQixDQUFnQyxFQUE5RDtBQUNBLFVBQU1JLFdBQVcsSUFBSWIsS0FBSixDQUFVLEtBQUtGLEtBQUwsQ0FBV0ksS0FBWCxDQUFpQk8sYUFBakIsQ0FBVixDQUFqQjtBQUNBO0FBQ0EsU0FBS0ssUUFBTCxDQUFjO0FBQ1pmLG1CQUFhYyxRQUREO0FBRVpWLHdCQUFrQk07QUFGTixLQUFkO0FBSUQ7O0FBRURELG1CQUFpQk8sS0FBakIsRUFBd0I7QUFDdEIsU0FBS0QsUUFBTCxDQUFjLEVBQUNmLGFBQWEsSUFBSUMsS0FBSixDQUFVZSxNQUFNQyxNQUFOLENBQWFDLEtBQXZCLENBQWQsRUFBZDtBQUNEOztBQUVEQyxvQkFBa0JDLE9BQWxCLEVBQTJCO0FBQ3pCLFNBQUtMLFFBQUwsQ0FBYztBQUNaZixtQkFBYSxJQUFJQyxLQUFKLENBQVVtQixPQUFWO0FBREQsS0FBZDtBQUdEOztBQUVEYixhQUFXO0FBQ1RLLFlBQVFDLEdBQVIsQ0FBWSxjQUFaO0FBQ0EsUUFBSSxLQUFLZCxLQUFMLENBQVdDLFdBQWYsRUFBNEI7QUFDMUIsV0FBS0QsS0FBTCxDQUFXQyxXQUFYLENBQXVCcUIsSUFBdkI7QUFDRDtBQUNGOztBQUVEYixjQUFZO0FBQ1YsUUFBSSxLQUFLVCxLQUFMLENBQVdDLFdBQWYsRUFBNEI7QUFDMUIsV0FBS0QsS0FBTCxDQUFXQyxXQUFYLENBQXVCc0IsS0FBdkI7QUFDRDtBQUNGOztBQUVEQyxXQUFTO0FBQ1AsVUFBTSxFQUFDcEIsS0FBRCxLQUFVLEtBQUtKLEtBQXJCO0FBQ0EsV0FDRTtBQUFBO0FBQUEsUUFBSyxJQUFHLGdCQUFSO0FBSUU7QUFBQTtBQUFBO0FBQ0UsZ0JBQUssYUFEUDtBQUVFLGNBQUcsYUFGTDtBQUdFLG9CQUFVLEtBQUtVO0FBSGpCO0FBS0U7QUFBQTtBQUFBLFlBQVEsT0FBT04sTUFBTSxDQUFOLENBQWY7QUFBQTtBQUFBLFNBTEY7QUFNRTtBQUFBO0FBQUEsWUFBUSxPQUFPQSxNQUFNLENBQU4sQ0FBZjtBQUFBO0FBQUEsU0FORjtBQU9FO0FBQUE7QUFBQSxZQUFRLE9BQU9BLE1BQU0sQ0FBTixDQUFmO0FBQUE7QUFBQTtBQVBGLE9BSkY7QUFhRTtBQUFBO0FBQUEsVUFBUSxJQUFHLE1BQVgsRUFBa0IsU0FBUyxLQUFLSSxRQUFoQztBQUFBO0FBQUEsT0FiRjtBQWdCRTtBQUFBO0FBQUEsVUFBUSxJQUFHLE9BQVgsRUFBbUIsU0FBUyxLQUFLQyxTQUFqQztBQUFBO0FBQUE7QUFoQkYsS0FERjtBQXNCRDtBQWpGK0I7O0FBb0ZsQ2dCLFNBQVNELE1BQVQsQ0FBZ0Isb0JBQUMsR0FBRCxPQUFoQixFQUF5QkUsU0FBU0MsYUFBVCxDQUF1QixNQUF2QixDQUF6QiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VycmVudFNvbmc6IG5ldyBBdWRpbygnLi9Bc3NldHMvc29uZy5tcDMnKSxcbiAgICAgIGN1cnJlbnRTb25nQ3VycmVudFRpbWU6IDAsXG4gICAgICBzb25nczogW1xuICAgICAgICAnLi9Bc3NldHMvc29uZy5tcDMnLFxuICAgICAgICAnLi9Bc3NldHMvQWxsX0lfZ290Lm1wMycsXG4gICAgICAgICcuL0Fzc2V0cy9TYXlfTXlfTmFtZS5tcDMnLFxuICAgICAgXSxcbiAgICAgIGN1cnJlbnRTb25nSW5kZXg6IDAsXG4gICAgfTtcblxuICAgIHRoaXMuY2hhbmdlQ3VycmVudFNvbmcgPSB0aGlzLmNoYW5nZUN1cnJlbnRTb25nLmJpbmQodGhpcyk7XG4gICAgdGhpcy5wbGF5U29uZyA9IHRoaXMucGxheVNvbmcuYmluZCh0aGlzKTtcbiAgICB0aGlzLnBhdXNlU29uZyA9IHRoaXMucGF1c2VTb25nLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTb25nQ2hvaWNlID0gdGhpcy5oYW5kbGVTb25nQ2hvaWNlLmJpbmQodGhpcyk7XG4gIH1cblxuICBjaGFuZ2VDdXJyZW50U29uZygpIHtcbiAgICAvLyBHZXQgbmV4dCBzb25nJ3MgaW5kZXhcbiAgICBjb25zdCBuZXh0U29uZ0luZGV4ID1cbiAgICAgICh0aGlzLnN0YXRlLmN1cnJlbnRTb25nSW5kZXggKyAxKSAlIHRoaXMuc3RhdGUuc29uZ3MubGVuZ3RoO1xuICAgIC8vIENyZWF0ZSBhdWRpbyBlbGVtZW50IGdpdmVuIHBhdGggZnJvbSBzdGF0ZVxuICAgIGNvbnNvbGUubG9nKGBuZXh0IHNvbmcgdXJsOiAke3RoaXMuc3RhdGUuc29uZ3NbbmV4dFNvbmdJbmRleF19YCk7XG4gICAgY29uc3QgbmV4dFNvbmcgPSBuZXcgQXVkaW8odGhpcy5zdGF0ZS5zb25nc1tuZXh0U29uZ0luZGV4XSk7XG4gICAgLy8gU2V0IG5ldyBzb25nIGFzIGN1cnJlbnQgc29uZyBpbiBzdGF0ZVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY3VycmVudFNvbmc6IG5leHRTb25nLFxuICAgICAgY3VycmVudFNvbmdJbmRleDogbmV4dFNvbmdJbmRleCxcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVNvbmdDaG9pY2UoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtjdXJyZW50U29uZzogbmV3IEF1ZGlvKGV2ZW50LnRhcmdldC52YWx1ZSl9KTtcbiAgfVxuXG4gIGNob29zZUN1cnJlbnRTb25nKHNvbmdVUkwpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGN1cnJlbnRTb25nOiBuZXcgQXVkaW8oc29uZ1VSTCksXG4gICAgfSk7XG4gIH1cblxuICBwbGF5U29uZygpIHtcbiAgICBjb25zb2xlLmxvZygncGxheSBwcmVzc2VkJyk7XG4gICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudFNvbmcpIHtcbiAgICAgIHRoaXMuc3RhdGUuY3VycmVudFNvbmcucGxheSgpO1xuICAgIH1cbiAgfVxuXG4gIHBhdXNlU29uZygpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5jdXJyZW50U29uZykge1xuICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50U29uZy5wYXVzZSgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7c29uZ3N9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD0ncGxheWJhY2tDZW50ZXInPlxuICAgICAgICB7LyogPGJ1dHRvbiBpZD0nY2hvb3NlU29uZycgb25DbGljaz17dGhpcy5jaGFuZ2VDdXJyZW50U29uZ30+XG4gICAgICAgICAgQ2hhbmdlIFNvbmdcbiAgICAgICAgPC9idXR0b24+ICovfVxuICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgbmFtZT0nc29uZy1zZWxlY3QnXG4gICAgICAgICAgaWQ9J3Nvbmctc2VsZWN0J1xuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNvbmdDaG9pY2V9XG4gICAgICAgID5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtzb25nc1swXX0+RmxpY2tlcjwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3NvbmdzWzFdfT5BbGwgSSBHb3Q8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtzb25nc1syXX0+U2F5IE15IE5hbWU8L29wdGlvbj5cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDxidXR0b24gaWQ9J3BsYXknIG9uQ2xpY2s9e3RoaXMucGxheVNvbmd9PlxuICAgICAgICAgIFBsYXlcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gaWQ9J3BhdXNlJyBvbkNsaWNrPXt0aGlzLnBhdXNlU29uZ30+XG4gICAgICAgICAgUGF1c2VcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwJykpO1xuIl19