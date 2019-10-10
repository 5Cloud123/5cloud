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
        artist: ''
      },
      songQueueAudio: [],
      songQueueObjects: [],
      songObjs: [{
        lengthString: 'Please choose a song first!',
        currentTime: 0,
        name: 'Flicker',
        URL: './Assets/flicker.mp3',
        artist: 'Porter Robinson'
      }, {
        lengthString: 'Please choose a song first!',
        currentTime: 0,
        name: 'All I Got',
        URL: './Assets/All_I_got.mp3',
        artist: 'Said The Sky'
      }, {
        lengthString: 'Please choose a song first!',
        currentTime: 0,
        name: 'Say My Name',
        URL: './Assets/Say_My_Name.mp3',
        artist: 'Odesza'
      }],
      songs: ['./Assets/flicker.mp3', './Assets/All_I_got.mp3', './Assets/Say_My_Name.mp3'],
      timerIntervalID: null,
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
      const songObj = this.state.songObjs[i];
      this.enqueueSong(songObj);
    }
  }

  enqueueSong(songObj) {
    const song = new Audio(songObj.URL);
    const { songQueueAudio, songQueueObjects } = this.state;
    songQueueAudio.push(song);
    songQueueObjects.push(songObj);
    this.setState({
      songQueueAudio,
      songQueueObjects
    });
  }

  playNextFromQueue() {
    // If queue has songs, get the next one
    if (this.state.songQueueAudio.length) {
      const { songQueueAudio, songQueueObjects } = this.state;
      const songAudio = songQueueAudio.pop();
      const songObj = songQueueObjects.pop();
      this.setState(state => {
        return {
          currentSongAudio: songAudio,
          songQueueAudio: songQueueAudio,
          songQueueObjects: songQueueObjects,
          timerIntervalID: null,
          currentSongReadyToPlay: false,
          currentSongObj: songObj
        };
      },
      // Then, update song length on page
      () => {
        this.recordNextSongsLength(songAudio);
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
    const songAudio = new Audio(event.target.value);
    songAudio.addEventListener('canplay', () => {
      this.recordNextSongsLength(songAudio);
      this.setState({ currentSongAudio: songAudio });
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
    this.setState(state => {
      const { currentSongObj } = state;
      currentSongObj.lengthString = length;
      return {
        currentSongObj
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
    this.setState(state => {
      const { currentSongObj } = this.state;
      currentSongObj.currentTime = Math.floor(currentTime + 1);
      return {
        currentSongObj
      };
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
    const { songObjs } = this.state;
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
          { value: songObjs[0].URL },
          songObjs[0].name
        ),
        React.createElement(
          'option',
          { value: songObjs[1].URL },
          songObjs[1].name
        ),
        React.createElement(
          'option',
          { value: songObjs[2].URL },
          songObjs[2].name
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
        { id: 'currnet-song-name' },
        'Current Song: ',
        this.state.currentSongObj.name
      ),
      React.createElement(
        'div',
        { id: 'current-playback-time' },
        'Current Playback time: ',
        this.state.currentSongObj.currentTime
      ),
      React.createElement(
        'div',
        { id: 'song-length' },
        'Song Length: ',
        this.state.currentSongObj.lengthString
      )
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.querySelector('#app'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwiY3VycmVudFNvbmdBdWRpbyIsImN1cnJlbnRTb25nT2JqIiwibGVuZ3RoU3RyaW5nIiwiY3VycmVudFRpbWUiLCJuYW1lIiwiVVJMIiwiYXJ0aXN0Iiwic29uZ1F1ZXVlQXVkaW8iLCJzb25nUXVldWVPYmplY3RzIiwic29uZ09ianMiLCJzb25ncyIsInRpbWVySW50ZXJ2YWxJRCIsImN1cnJlbnRTb25nUmVhZHlUb1BsYXkiLCJoYW5kbGVTb25nQ2hvaWNlIiwiYmluZCIsInJlY29yZE5leHRTb25nc0xlbmd0aCIsInBsYXlTb25nIiwicGF1c2VTb25nIiwiaW5jcmVtZW50VGltZXIiLCJzdGFydFRpbWVyIiwic3RvcFRpbWVyIiwicGxheU5leHRGcm9tUXVldWUiLCJlbnF1ZXVlU29uZyIsImNvbXBvbmVudERpZE1vdW50IiwiaSIsImxlbmd0aCIsInNvbmdPYmoiLCJzb25nIiwiQXVkaW8iLCJwdXNoIiwic2V0U3RhdGUiLCJzb25nQXVkaW8iLCJwb3AiLCJhbGVydCIsImVuYWJsZVBsYXlDdXJyZW50U29uZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInRhcmdldCIsInZhbHVlIiwiZHVyYXRpb25SZW1haW5pbmciLCJNYXRoIiwiZmxvb3IiLCJkdXJhdGlvbiIsImhvdXJzIiwibWludXRlcyIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYWRTdGFydCIsInBsYXkiLCJwYXVzZSIsInNldEludGVydmFsIiwiSUQiLCJjbGVhckludGVydmFsIiwicmVuZGVyIiwiUmVhY3RET00iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLEdBQU4sU0FBa0JDLE1BQU1DLFNBQXhCLENBQWtDO0FBQ2hDQyxjQUFZQyxLQUFaLEVBQW1CO0FBQ2pCLFVBQU1BLEtBQU47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LEtBQUtDLFNBQWpDO0FBQUE7QUFBQSxPQWRGO0FBaUJFO0FBQUE7QUFBQSxVQUFRLElBQUcsZUFBWCxFQUEyQixTQUFTLEtBQUtJLGlCQUF6QztBQUFBO0FBQUEsT0FqQkY7QUFvQkU7QUFBQTtBQUFBLFVBQUssSUFBRyxtQkFBUjtBQUFBO0FBQ2lCLGFBQUt0QixLQUFMLENBQVdFLGNBQVgsQ0FBMEJHO0FBRDNDLE9BcEJGO0FBdUJFO0FBQUE7QUFBQSxVQUFLLElBQUcsdUJBQVI7QUFBQTtBQUMwQixhQUFLTCxLQUFMLENBQVdFLGNBQVgsQ0FBMEJFO0FBRHBELE9BdkJGO0FBMEJFO0FBQUE7QUFBQSxVQUFLLElBQUcsYUFBUjtBQUFBO0FBQ2dCLGFBQUtKLEtBQUwsQ0FBV0UsY0FBWCxDQUEwQkM7QUFEMUM7QUExQkYsS0FERjtBQWdDRDtBQTVPK0I7O0FBK09sQ29ELFNBQVNELE1BQVQsQ0FBZ0Isb0JBQUMsR0FBRCxPQUFoQixFQUF5QkUsU0FBU0MsYUFBVCxDQUF1QixNQUF2QixDQUF6QiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIC8vIFNldCBzdGF0ZSAtIG1vc3RseSByZXZvbHZlcyBhcm91bmQgY3VycmVudCBzb25nIHBsYXlpbmdcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VycmVudFNvbmdBdWRpbzogbnVsbCxcbiAgICAgIGN1cnJlbnRTb25nT2JqOiB7XG4gICAgICAgIGxlbmd0aFN0cmluZzogJ1BsZWFzZSBjaG9vc2UgYSBzb25nIGZpcnN0IScsXG4gICAgICAgIGN1cnJlbnRUaW1lOiAwLFxuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgVVJMOiAnJyxcbiAgICAgICAgYXJ0aXN0OiAnJyxcbiAgICAgIH0sXG4gICAgICBzb25nUXVldWVBdWRpbzogW10sXG4gICAgICBzb25nUXVldWVPYmplY3RzOiBbXSxcbiAgICAgIHNvbmdPYmpzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBsZW5ndGhTdHJpbmc6ICdQbGVhc2UgY2hvb3NlIGEgc29uZyBmaXJzdCEnLFxuICAgICAgICAgIGN1cnJlbnRUaW1lOiAwLFxuICAgICAgICAgIG5hbWU6ICdGbGlja2VyJyxcbiAgICAgICAgICBVUkw6ICcuL0Fzc2V0cy9mbGlja2VyLm1wMycsXG4gICAgICAgICAgYXJ0aXN0OiAnUG9ydGVyIFJvYmluc29uJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxlbmd0aFN0cmluZzogJ1BsZWFzZSBjaG9vc2UgYSBzb25nIGZpcnN0IScsXG4gICAgICAgICAgY3VycmVudFRpbWU6IDAsXG4gICAgICAgICAgbmFtZTogJ0FsbCBJIEdvdCcsXG4gICAgICAgICAgVVJMOiAnLi9Bc3NldHMvQWxsX0lfZ290Lm1wMycsXG4gICAgICAgICAgYXJ0aXN0OiAnU2FpZCBUaGUgU2t5JyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxlbmd0aFN0cmluZzogJ1BsZWFzZSBjaG9vc2UgYSBzb25nIGZpcnN0IScsXG4gICAgICAgICAgY3VycmVudFRpbWU6IDAsXG4gICAgICAgICAgbmFtZTogJ1NheSBNeSBOYW1lJyxcbiAgICAgICAgICBVUkw6ICcuL0Fzc2V0cy9TYXlfTXlfTmFtZS5tcDMnLFxuICAgICAgICAgIGFydGlzdDogJ09kZXN6YScsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgc29uZ3M6IFtcbiAgICAgICAgJy4vQXNzZXRzL2ZsaWNrZXIubXAzJyxcbiAgICAgICAgJy4vQXNzZXRzL0FsbF9JX2dvdC5tcDMnLFxuICAgICAgICAnLi9Bc3NldHMvU2F5X015X05hbWUubXAzJyxcbiAgICAgIF0sXG4gICAgICB0aW1lckludGVydmFsSUQ6IG51bGwsXG4gICAgICBjdXJyZW50U29uZ1JlYWR5VG9QbGF5OiBmYWxzZSxcbiAgICB9O1xuXG4gICAgLy8gQmluZCBmdW5jdGlvbnMgdG8gdGhpc1xuICAgIHRoaXMuaGFuZGxlU29uZ0Nob2ljZSA9IHRoaXMuaGFuZGxlU29uZ0Nob2ljZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMucmVjb3JkTmV4dFNvbmdzTGVuZ3RoID0gdGhpcy5yZWNvcmROZXh0U29uZ3NMZW5ndGguYmluZCh0aGlzKTtcbiAgICB0aGlzLnBsYXlTb25nID0gdGhpcy5wbGF5U29uZy5iaW5kKHRoaXMpO1xuICAgIHRoaXMucGF1c2VTb25nID0gdGhpcy5wYXVzZVNvbmcuYmluZCh0aGlzKTtcbiAgICB0aGlzLmluY3JlbWVudFRpbWVyID0gdGhpcy5pbmNyZW1lbnRUaW1lci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhcnRUaW1lciA9IHRoaXMuc3RhcnRUaW1lci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RvcFRpbWVyID0gdGhpcy5zdG9wVGltZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnBsYXlOZXh0RnJvbVF1ZXVlID0gdGhpcy5wbGF5TmV4dEZyb21RdWV1ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZW5xdWV1ZVNvbmcgPSB0aGlzLmVucXVldWVTb25nLmJpbmQodGhpcyk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvLyBFbnF1ZXVlIGFsbCBzb25nc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGF0ZS5zb25ncy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc29uZ09iaiA9IHRoaXMuc3RhdGUuc29uZ09ianNbaV07XG4gICAgICB0aGlzLmVucXVldWVTb25nKHNvbmdPYmopO1xuICAgIH1cbiAgfVxuXG4gIGVucXVldWVTb25nKHNvbmdPYmopIHtcbiAgICBjb25zdCBzb25nID0gbmV3IEF1ZGlvKHNvbmdPYmouVVJMKTtcbiAgICBjb25zdCB7c29uZ1F1ZXVlQXVkaW8sIHNvbmdRdWV1ZU9iamVjdHN9ID0gdGhpcy5zdGF0ZTtcbiAgICBzb25nUXVldWVBdWRpby5wdXNoKHNvbmcpO1xuICAgIHNvbmdRdWV1ZU9iamVjdHMucHVzaChzb25nT2JqKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNvbmdRdWV1ZUF1ZGlvLFxuICAgICAgc29uZ1F1ZXVlT2JqZWN0cyxcbiAgICB9KTtcbiAgfVxuXG4gIHBsYXlOZXh0RnJvbVF1ZXVlKCkge1xuICAgIC8vIElmIHF1ZXVlIGhhcyBzb25ncywgZ2V0IHRoZSBuZXh0IG9uZVxuICAgIGlmICh0aGlzLnN0YXRlLnNvbmdRdWV1ZUF1ZGlvLmxlbmd0aCkge1xuICAgICAgY29uc3Qge3NvbmdRdWV1ZUF1ZGlvLCBzb25nUXVldWVPYmplY3RzfSA9IHRoaXMuc3RhdGU7XG4gICAgICBjb25zdCBzb25nQXVkaW8gPSBzb25nUXVldWVBdWRpby5wb3AoKTtcbiAgICAgIGNvbnN0IHNvbmdPYmogPSBzb25nUXVldWVPYmplY3RzLnBvcCgpO1xuICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAgKHN0YXRlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGN1cnJlbnRTb25nQXVkaW86IHNvbmdBdWRpbyxcbiAgICAgICAgICAgIHNvbmdRdWV1ZUF1ZGlvOiBzb25nUXVldWVBdWRpbyxcbiAgICAgICAgICAgIHNvbmdRdWV1ZU9iamVjdHM6IHNvbmdRdWV1ZU9iamVjdHMsXG4gICAgICAgICAgICB0aW1lckludGVydmFsSUQ6IG51bGwsXG4gICAgICAgICAgICBjdXJyZW50U29uZ1JlYWR5VG9QbGF5OiBmYWxzZSxcbiAgICAgICAgICAgIGN1cnJlbnRTb25nT2JqOiBzb25nT2JqLFxuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIC8vIFRoZW4sIHVwZGF0ZSBzb25nIGxlbmd0aCBvbiBwYWdlXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLnJlY29yZE5leHRTb25nc0xlbmd0aChzb25nQXVkaW8pO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydCgnTm8gc29uZ3MgaW4gcXVldWUuIFBsZWFzZSBlbnF1ZXVlIHNvbWUgc29uZ3MhJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETyAtIGluY29ycG9yYXRlIHRoaXNcbiAgZW5hYmxlUGxheUN1cnJlbnRTb25nKCkge1xuICAgIHNvbmcuYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheScsICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2N1cnJlbnRTb25nUmVhZHlUb1BsYXk6IHRydWV9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVNvbmdDaG9pY2UoZXZlbnQpIHtcbiAgICBjb25zdCBzb25nQXVkaW8gPSBuZXcgQXVkaW8oZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICBzb25nQXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheScsICgpID0+IHtcbiAgICAgIHRoaXMucmVjb3JkTmV4dFNvbmdzTGVuZ3RoKHNvbmdBdWRpbyk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtjdXJyZW50U29uZ0F1ZGlvOiBzb25nQXVkaW99KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlY29yZE5leHRTb25nc0xlbmd0aChzb25nQXVkaW8pIHtcbiAgICAvLyBJdGVyYXRpdmVseSByZWR1Y2UgZHVyYXRpb25SZW1haW5pbmcgdG8gY3JlYXRlIHRpbWUgc3RyaW5nXG4gICAgbGV0IGR1cmF0aW9uUmVtYWluaW5nID0gTWF0aC5mbG9vcihzb25nQXVkaW8uZHVyYXRpb24pO1xuICAgIGxldCBsZW5ndGggPSAnJztcbiAgICAvLyBJZiAxKyBob3VycyBsb25nLCByZWNvcmQgdGhvc2UgaG91cnNcbiAgICBpZiAoZHVyYXRpb25SZW1haW5pbmcgPiAzNjAwKSB7XG4gICAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IoZHVyYXRpb25SZW1haW5pbmcgLyAzNjAwKTtcbiAgICAgIGxlbmd0aCArPSBgJHtob3Vyc306YDtcbiAgICAgIGR1cmF0aW9uUmVtYWluaW5nIC09IGhvdXJzICogMzYwMDtcbiAgICB9XG4gICAgLy8gSWYgMSsgbWludXRlcyBsb25nLCByZWNvcmQgdGhvc2UgbWludXRlc1xuICAgIGlmIChkdXJhdGlvblJlbWFpbmluZyA+IDYwKSB7XG4gICAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcihkdXJhdGlvblJlbWFpbmluZyAvIDYwKTtcbiAgICAgIGxlbmd0aCArPSBgJHttaW51dGVzfTpgO1xuICAgICAgZHVyYXRpb25SZW1haW5pbmcgLT0gbWludXRlcyAqIDYwO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggKz0gJzA6JztcbiAgICB9XG4gICAgLy8gSWYgMSsgc2Vjb25kcyBsb25nLCByZWNvcmQgdGhvc2Ugc2Vjb25kc1xuICAgIGlmIChkdXJhdGlvblJlbWFpbmluZyA+IDApIHtcbiAgICAgIGlmIChkdXJhdGlvblJlbWFpbmluZyA8IDEwKSB7XG4gICAgICAgIC8vIElmIHNpbmxnbGUtZGlnaXQsIHBhZC1cbiAgICAgICAgbGVuZ3RoICs9IEpTT04uc3RyaW5naWZ5KGR1cmF0aW9uUmVtYWluaW5nKS5wYWRTdGFydCgyLCAnMCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGVuZ3RoICs9IGAke2R1cmF0aW9uUmVtYWluaW5nfWA7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFNhdmUgdG8gc3RhdGVcbiAgICB0aGlzLnNldFN0YXRlKChzdGF0ZSkgPT4ge1xuICAgICAgY29uc3Qge2N1cnJlbnRTb25nT2JqfSA9IHN0YXRlO1xuICAgICAgY3VycmVudFNvbmdPYmoubGVuZ3RoU3RyaW5nID0gbGVuZ3RoO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY3VycmVudFNvbmdPYmosXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcGxheVNvbmcoKSB7XG4gICAgLy8gU3RhcnQgc29uZyBwbGF5YmFja1xuICAgIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTb25nQXVkaW8pIHtcbiAgICAgIHRoaXMuc3RhdGUuY3VycmVudFNvbmdBdWRpby5wbGF5KCk7XG4gICAgICAvLyBTdGFydCB0aW1lclxuICAgICAgdGhpcy5zdGFydFRpbWVyKCk7XG4gICAgfVxuICB9XG5cbiAgcGF1c2VTb25nKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTb25nQXVkaW8pIHtcbiAgICAgIHRoaXMuc3RhdGUuY3VycmVudFNvbmdBdWRpby5wYXVzZSgpO1xuICAgICAgLy8gU3RvcCB0aW1lclxuICAgICAgdGhpcy5zdG9wVGltZXIoKTtcbiAgICB9XG4gIH1cblxuICBpbmNyZW1lbnRUaW1lcigpIHtcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IHRoaXMuc3RhdGUuY3VycmVudFNvbmdBdWRpby5jdXJyZW50VGltZTtcbiAgICB0aGlzLnNldFN0YXRlKChzdGF0ZSkgPT4ge1xuICAgICAgY29uc3Qge2N1cnJlbnRTb25nT2JqfSA9IHRoaXMuc3RhdGU7XG4gICAgICBjdXJyZW50U29uZ09iai5jdXJyZW50VGltZSA9IE1hdGguZmxvb3IoY3VycmVudFRpbWUgKyAxKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGN1cnJlbnRTb25nT2JqLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXJ0VGltZXIoKSB7XG4gICAgLy8gVXBkYXRlIHRpbWVyIGV2ZXJ5IHNlY29uZFxuICAgIGNvbnN0IHRpbWVySW50ZXJ2YWxJRCA9IHNldEludGVydmFsKHRoaXMuaW5jcmVtZW50VGltZXIsIDEwMDApO1xuICAgIC8vIFJlY29yZCBpZCBvZiBpbnRlcnZhbFxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdGltZXJJbnRlcnZhbElELFxuICAgIH0pO1xuICB9XG5cbiAgc3RvcFRpbWVyKCkge1xuICAgIC8vIEdldCBJRCBvZiB0aW1lciBjdXJyZW50bHkgcnVubmluZ1xuICAgIGNvbnN0IElEID0gdGhpcy5zdGF0ZS50aW1lckludGVydmFsSUQ7XG4gICAgLy8gQ2xlYXIgaW50ZXJ2YWwgd2l0aCBpZFxuICAgIGNsZWFySW50ZXJ2YWwoSUQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtzb25nT2Jqc30gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPSdwbGF5YmFja0NlbnRlcic+XG4gICAgICAgIDxzZWxlY3RcbiAgICAgICAgICBuYW1lPSdzb25nLXNlbGVjdCdcbiAgICAgICAgICBpZD0nc29uZy1zZWxlY3QnXG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU29uZ0Nob2ljZX1cbiAgICAgICAgPlxuICAgICAgICAgIDxvcHRpb24+PC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT17c29uZ09ianNbMF0uVVJMfT57c29uZ09ianNbMF0ubmFtZX08L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtzb25nT2Jqc1sxXS5VUkx9Pntzb25nT2Jqc1sxXS5uYW1lfTwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3NvbmdPYmpzWzJdLlVSTH0+e3NvbmdPYmpzWzJdLm5hbWV9PC9vcHRpb24+XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8YnV0dG9uIGlkPSdwbGF5JyBvbkNsaWNrPXt0aGlzLnBsYXlTb25nfT5cbiAgICAgICAgICBQbGF5XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGlkPSdwYXVzZScgb25DbGljaz17dGhpcy5wYXVzZVNvbmd9PlxuICAgICAgICAgIFBhdXNlXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGlkPSduZXh0LXNvbmctYnRuJyBvbkNsaWNrPXt0aGlzLnBsYXlOZXh0RnJvbVF1ZXVlfT5cbiAgICAgICAgICBOZXh0IFNvbmdcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxkaXYgaWQ9J2N1cnJuZXQtc29uZy1uYW1lJz5cbiAgICAgICAgICBDdXJyZW50IFNvbmc6IHt0aGlzLnN0YXRlLmN1cnJlbnRTb25nT2JqLm5hbWV9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGlkPSdjdXJyZW50LXBsYXliYWNrLXRpbWUnPlxuICAgICAgICAgIEN1cnJlbnQgUGxheWJhY2sgdGltZToge3RoaXMuc3RhdGUuY3VycmVudFNvbmdPYmouY3VycmVudFRpbWV9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGlkPSdzb25nLWxlbmd0aCc+XG4gICAgICAgICAgU29uZyBMZW5ndGg6IHt0aGlzLnN0YXRlLmN1cnJlbnRTb25nT2JqLmxlbmd0aFN0cmluZ31cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwJykpO1xuIl19