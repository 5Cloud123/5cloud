import React from 'react';

let Album = props => {
  return (
    <div className="album-item">
      <div>{props.album.user}</div>
      <div>{props.album.album_name}</div>
      <div>Album {props.album.year_posted}</div>
    </div>
  );
};

export default Album;
