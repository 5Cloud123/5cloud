import React from 'react';
import style from './Song.css';

let Song = props => {
  return (
    <div className={style.container}>
      <img src={props.track.song_art_url} className={style.art} />
      <div className={style.info}>
        <div className={style.username}>{props.track.artist_name}</div>
        <div className={style.title}>{props.track.song_name}</div>
        <div className={style['icon-bar']}>
          <span className={style.plays}>
            <img
              className={style['play-icon']}
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c3RhdHNfcGxheSA0PC90aXRsZT48cGF0aCBkPSJNNCAxM1YzbDkgNS05IDV6IiBmaWxsPSIjOTk5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4="
            />
            {props.track.play_count}
          </span>
          <span className={style.likes}>
            <img
              className={style['like-icon']}
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c3RhdHNfbGlrZXNfZ3JleTwvdGl0bGU+PHBhdGggZD0iTTEwLjgwNSAzYy0yLjAyIDAtMi44MDQgMi4zNDUtMi44MDQgMi4zNDVTNy4yMTMgMyA1LjE5NiAzQzMuNDk0IDMgMS43NDggNC4wOTYgMi4wMyA2LjUxNGMuMzQ0IDIuOTUzIDUuNzI1IDYuNDc5IDUuOTYzIDYuNDg3LjIzOC4wMDggNS43MzgtMy43MjIgNS45ODgtNi41QzE0LjE4OCA0LjIwMSAxMi41MDcgMyAxMC44MDUgM3oiIGZpbGw9IiM5OTkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg=="
            />
            {props.track.like_count}
          </span>
          <span className={style.reposts}>
            <img
              className={style['repost-icon']}
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c3RhdHNfcmVwb3N0PC90aXRsZT48cGF0aCBkPSJNMiA2djVjMCAxLjEwNS45MDIgMiAyLjAwOSAyaDYuOTg3SDEwbC0yLTJINFY2aC0uNUg2TDMgMyAwIDZoMnptNC0zaC0uOTk2IDYuOTg3QzEzLjA5OCAzIDE0IDMuODk1IDE0IDV2NWgtMlY1SDhMNiAzem0xMCA3aC02bDMgMyAzLTN6IiBmaWxsPSIjOTk5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4="
            />
            {props.track.repost_count}
          </span>
          <span className={style.comments}>
            <img
              className={style['comment-icon']}
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c3RhdHNfY29tbWVudDwvdGl0bGU+PHBhdGggZD0iTTUgM2MtMS4xMDUgMC0yIC44ODctMiAyLjAwNnYyLjk4OEMzIDkuMTAyIDMuODg3IDEwIDUgMTBoNmMxLjEwNSAwIDItLjg4NyAyLTIuMDA2VjUuMDA2QTEuOTk4IDEuOTk4IDAgMCAwIDExIDNINXptMCA3djNsMy0zSDV6IiBmaWxsPSIjOTk5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4="
            />
            {props.track.comment_count}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Song;
