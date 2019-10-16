import React from 'react';
import style from './Album.css';

let Album = props => {
  return (
    <div className={style.container}>
      <img src={props.album.album_art} className={style.art} />
      <div className={style.username}>{props.album.user}</div>
      <div className={style.title}>{props.album.album_name}</div>
      <div className={style.year}>Album {props.album.year_posted}</div>
    </div>
  );
};

export default Album;
