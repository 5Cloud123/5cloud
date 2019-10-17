import React from 'react';
import style from './Song.css';

let Song = props => {
  return (
    <div className={style.container}>
      <img src={props.track.song_art_url} className={style.art} />
      <div className={style.username}>{props.track.artist_name}</div>
      <div className={style.title}>{props.track.song_name}</div>
      <div className={style['icon-bar']}>
        <span>{props.track.play_count}</span>
        <span className={style.likes}>
          <img className={style['like-icon']} />
          {props.track.like_count}
        </span>
        <span>{props.track.repost_count}</span>
        <span>{props.track.comment_count}</span>
      </div>
    </div>
  );
};

export default Song;
