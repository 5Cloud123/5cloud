import React from 'react';
import style from './Playlist.css';

let Playlist = props => {
  return (
    <div className={style.container}>
      <img src={props.playlist.playlist_art} className={style.art} />
      <div className={style.info}>
        <div className={style.username}>{props.playlist.username}</div>
        <div className={style.title}>{props.playlist.playlist_name}</div>
        <div className={style['icon-bar']}>
          <span className={style.likes}>
            <img className={style['like-icon']} />
            {props.playlist.like_count}
          </span>
          <span className={style.reposts}>
            <img className={style['repost-icon']} />
            {props.playlist.repost_count}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
