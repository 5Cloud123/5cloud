import React from 'react';
import InteractionContainer from './InteractionContainer.jsx';
import ItemsContainer from './ItemsContainer.jsx';
import axios from 'axios';
import style from './Sidebar.css';
import 'babel-polyfill';

class Sidebar extends React.Component {
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
        this.setState({ currentSong: song.data[0] });
      });
    axios
      .get(`http://localhost:5000/relatedtracks/${this.state.currentSongId}`)
      .then(songs => {
        this.setState({ relatedTracks: songs.data });
      })
      .catch(err => {
        console.log(err, 'this is the error from axios req');
      });

    axios
      .get(`http://localhost:5000/userlike/${this.state.currentSongId}`)
      .then(users => {
        this.setState({ userLikes: users.data });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`http://localhost:5000/userrepost/${this.state.currentSongId}`)
      .then(users => {
        this.setState({ userReposts: users.data });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`http://localhost:5000/playlistincluded/${this.state.currentSongId}`)
      .then(playlists => {
        this.setState({ playlistsInclud: playlists.data });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`http://localhost:5000/albumincluded/${this.state.currentSongId}`)
      .then(albums => {
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
        <ItemsContainer
          id="related-tracks"
          type="relatedTracks"
          tracks={this.state.relatedTracks}
        />
        <ItemsContainer
          id="inclusive-playlists"
          type="playlists"
          playlists={this.state.playlistsInclud}
        />
        <ItemsContainer
          id="inclusive-albums"
          type="albums"
          albums={this.state.albumsInclud}
        />

        <InteractionContainer
          id="user-likes"
          type="likes"
          users={this.state.userLikes}
          song={this.state.currentSong}
          className="interaction-container"
        />
        <InteractionContainer
          id="user-reposts"
          type="reposts"
          users={this.state.userReposts}
          song={this.state.currentSong}
          className="interaction-container"
        />
      </div>
    );
  }
}

export default Sidebar;

ReactDOM.render(
  <Sidebar currentSong="Song_00001" />,
  document.getElementById('sidebar')
);
