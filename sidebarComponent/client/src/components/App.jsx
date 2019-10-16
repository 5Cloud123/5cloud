import React from 'react';
import InteractionContainer from './InteractionContainer.jsx';
import ItemsContainer from './ItemsContainer.jsx';
import axios from 'axios';
import style from './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSongId: this.props.currentSong,
      currentSong: {},
      relatedTracks: [],
      playlistsInclud: [],
      albumsInclud: [],
      userLikes: [],
      userReposts: []
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/currentSong/${this.state.currentSongId}`)
      .then(song => {
        console.log(song, 'this is the current song');
        this.setState({ currentSong: song.data[0] });
      });
    axios
      .get(`http://localhost:5000/relatedtracks/${this.state.currentSongId}`)
      .then(songs => {
        console.log(songs, 'these are related tracks');
        this.setState({ relatedTracks: songs.data });
      })
      .catch(err => {
        console.log(err, 'this is the error from axios req');
      });

    axios
      .get(`http://localhost:5000/userlike/${this.state.currentSongId}`)
      .then(users => {
        console.log(users, 'these are users who have liked the song');
        this.setState({ userLikes: users.data });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`http://localhost:5000/userrepost/${this.state.currentSongId}`)
      .then(users => {
        console.log(users, 'these are users who have reposted the song');
        this.setState({ userReposts: users.data });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`http://localhost:5000/playlistincluded/${this.state.currentSongId}`)
      .then(playlists => {
        console.log(playlists, 'these are playlists which contain the song');
        this.setState({ playlistsInclud: playlists.data });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`http://localhost:5000/albumincluded/${this.state.currentSongId}`)
      .then(albums => {
        console.log(albums, 'these are albums which contain the song');
        this.setState({ albumsInclud: albums.data });
      })
      .catch(err => {
        console.log(err);
      });
    //api requests to fill the app's state components
  }

  render() {
    return (
      <div className={style.container}>
        <span>React is working!</span>
        <ItemsContainer
          type="relatedTracks"
          tracks={this.state.relatedTracks}
        />
        <ItemsContainer
          type="playlists"
          playlists={this.state.playlistsInclud}
        />
        <ItemsContainer type="albums" albums={this.state.albumsInclud} />

        <InteractionContainer
          type="likes"
          users={this.state.userLikes}
          song={this.state.currentSong}
          className="interaction-container"
        />
        <InteractionContainer
          type="reposts"
          users={this.state.userReposts}
          song={this.state.currentSong}
          className="interaction-container"
        />
      </div>
    );
  }
}

export default App;
