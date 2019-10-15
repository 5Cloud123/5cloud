import React from 'react';
import Song from './Song.jsx';
import Album from './Album.jsx';
import Playlist from './Playlist.jsx';

let ItemsContainer = props => {
  if (props.type === 'relatedTracks') {
    if (props.tracks.length) {
      console.log(props.tracks, 'this is props.tracks');
      let threeTracks = [];
      for (let i = 1; i < 4; i++) {
        threeTracks.push(props.tracks[i]);
      }

      return (
        <div>
          <div className="top-bar">
            <i className="tracks-icon top-bar-icon"></i>
            <span>Related tracks</span>
            <span>View all</span>
          </div>

          <div>
            {threeTracks.map(track => {
              return <Song track={track} />;
            })}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  if (props.type === 'playlists') {
    if (props.playlists.length) {
      let threePlaylists = [];
      for (let i = 0; i < 3; i++) {
        threePlaylists.push(props.playlists[i]);
      }

      return (
        <div>
          <div className="top-bar">
            <i className="playlists-icon top-bar-icon"></i>
            <span>In Playlists</span>
            <span>View all</span>
          </div>

          <div>
            {threePlaylists.map(playlist => {
              return <Playlist playlist={playlist} />;
            })}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  if (props.type === 'albums') {
    if (props.albums.length) {
      let threeAlbums = [];
      for (let i = 0; i < 3; i++) {
        threeAlbums.push(props.albums[i]);
      }

      return (
        <div>
          <div className="top-bar">
            <i className="albums-icon top-bar-icon"></i>
            <span>In Albums</span>
            <span>View all</span>
          </div>

          <div>
            {threeAlbums.map(album => {
              return <Album album={album} />;
            })}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
};

export default ItemsContainer;
