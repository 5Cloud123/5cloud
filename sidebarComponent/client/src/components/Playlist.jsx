import React from 'react';
import style from './styles/Playlist.css';

let Playlist = props => {
  return (
    <div className={style.container}>
      <img src={props.playlist.playlist_art} className={style.art} />
      <div className={style.username}>{props.playlist.username}</div>
      <div className={style.title}>{props.playlist.playlist_name}</div>
      <div className={style['icon-bar']}>
        <span>{props.playlist.like_count}</span>
        <span>{props.playlist.repost_count}</span>
      </div>
    </div>
  );
};

export default Playlist;
