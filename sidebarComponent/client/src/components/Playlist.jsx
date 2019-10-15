import React from 'react';

let Playlist = props => {
  return (
    <div className="playlist-item">
      <div>{props.playlist.playlist_name}</div>
      <div>
        <span>
          <i />
          {props.playlist.like_count}
        </span>
        <span>
          <i />
          {props.playlist.repost_count}
        </span>
      </div>
    </div>
  );
};

export default Playlist;
