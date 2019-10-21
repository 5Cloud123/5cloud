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
            <div className={style.descriptor}>
              <img
                className={style['tracks-icon']}
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0iIzk5OSIgZD0iTTUgMTJoMnY0SDV6TTIxIDEyaDJ2NGgtMnpNMTcgMTBoMnY4aC0yek05IDhoMnYxMkg5ek0xMyA1aDJ2MThoLTJ6Ii8+PC9zdmc+"
              />
              <span className={style['descriptor-text']}>Related Tracks</span>
            </div>
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
            <div className={style.descriptor}>
              <img
                className={style['playlists-icon']}
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+aWNfcGxheWxpc3RfMTg8L3RpdGxlPjxnIGZpbGw9IiM5OTkiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTIgNmgxMHYxMEgyeiIvPjxwYXRoIGZpbGwtb3BhY2l0eT0iLjciIGQ9Ik01IDJoMTF2MTBoLTJWNEg1eiIvPjwvZz48L3N2Zz4="
              />
              <span className={style['descriptor-text']}>In Playlists</span>
            </div>
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
            <div className={style.descriptor}>
              <img
                className={style['playlists-icon']}
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+aWNfcGxheWxpc3RfMTg8L3RpdGxlPjxnIGZpbGw9IiM5OTkiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTIgNmgxMHYxMEgyeiIvPjxwYXRoIGZpbGwtb3BhY2l0eT0iLjciIGQ9Ik01IDJoMTF2MTBoLTJWNEg1eiIvPjwvZz48L3N2Zz4="
              />
              <span className={style['descriptor-text']}>In Albums</span>
            </div>
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
