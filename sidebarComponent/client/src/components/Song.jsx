import React from 'react';

let Song = props => {
  return (
    <div className="song-item">
      <div>{props.track.artist_name}</div>
      <div>{props.track.song_name}</div>
      <div>
        <span>
          <i />
          {props.track.play_count}
        </span>
        <span>
          <i />
          {props.track.like_count}
        </span>
        <span>
          <i />
          {props.track.repost_count}
        </span>
        <span>
          <i />
          {props.track.comment_count}
        </span>
      </div>
    </div>
  );
};

export default Song;
