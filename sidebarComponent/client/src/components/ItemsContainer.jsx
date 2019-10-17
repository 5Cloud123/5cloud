import React from 'react';
import Song from './Song.jsx';
import Album from './Album.jsx';
import Playlist from './Playlist.jsx';
import style from './ItemsContainer.css';

let ItemsContainer = props => {
  if (props.type === 'relatedTracks') {
    if (props.tracks.length) {
      console.log(props.tracks, 'this is props.tracks');
      let threeTracks = [];
      for (let i = 1; i < 4; i++) {
        threeTracks.push(props.tracks[i]);
      }

      return (
        <div className={style['master-container']}>
          <div className={style.topbar}>
            <i className="tracks-icon top-bar-icon"></i>
            <span className={style.descriptor}>Related Tracks</span>
            <span className={style.view}>View all</span>
          </div>

          <div>
            {threeTracks.map(track => {
              return <Song track={track} key={track.id} />;
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
        <div className={style['master-container']}>
          <div className={style.topbar}>
            <i className="playlists-icon top-bar-icon"></i>
            <span className={style.descriptor}>In Playlists</span>
            <span className={style.view}>View all</span>
          </div>

          <div>
            {threePlaylists.map(playlist => {
              return <Playlist playlist={playlist} key={playlist.id} />;
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
        <div className={style['master-container']}>
          <div className={style.topbar}>
            <i className={style.icon}></i>
            <span className={style.descriptor}>In Albums</span>
            <span className={style.view}>View all</span>
          </div>

          <div>
            {threeAlbums.map(album => {
              return <Album album={album} key={album.id} />;
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
