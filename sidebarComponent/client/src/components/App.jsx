import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSongId: this.props.currentSong,
      relatedTracks: [],
      playlistsInclud: [],
      albumsInclud: [],
      userLikes: [],
      userReposts: []
    };
  }

  componentDidMount() {
    axios
      .get(`https://localhost:5000/relatedtracks/${this.state.currentSongId}`)
      .then(songs => {
        this.setState({ relatedTracks: songs });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`https://localhost:5000/userlike/${this.state.currentSongId}`)
      .then(users => {
        this.setState({ userLikes: users });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`https://localhost:5000/userrepost/${this.state.currentSongId}`)
      .then(users => {
        this.setState({ userReposts: users });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(
        `https://localhost:5000/playlistincluded/${this.state.currentSongId}`
      )
      .then(playlists => {
        this.setState({ playlistsInclud: playlists });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`https://localhost:5000/albumincluded/${this.state.currentSongId}`)
      .then(albums => {
        this.setState({ albumsInclud: albums });
      })
      .catch(err => {
        console.log(err);
      });
    //api requests to fill the app's state components
  }

  render() {
    <div>
      <ItemContainer type="related" relatedTracks={this.state.relatedTracks} />
      <ItemContainer type="playlists" playlists={this.state.playlistsInclud} />
      <ItemContainer type="albums" albums={this.state.albumsInclud} />

      <InteractionContainer />
      <InteractionContainer />
    </div>;
  }
}

export default App;
