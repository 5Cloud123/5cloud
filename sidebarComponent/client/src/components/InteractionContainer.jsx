import React from 'react';
import User from './User.jsx';
import style from './InteractionContainer.css';

let InteractionContainer = props => {
  if (props.type === 'likes') {
    return (
      <div className={style['master-container']}>
        <div className={style.topbar}>
          <div className={style.descriptor}>
            <img
              className={style['likes-icon']}
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c3RhdHNfbGlrZXNfZ3JleTwvdGl0bGU+PHBhdGggZD0iTTEwLjgwNSAzYy0yLjAyIDAtMi44MDQgMi4zNDUtMi44MDQgMi4zNDVTNy4yMTMgMyA1LjE5NiAzQzMuNDk0IDMgMS43NDggNC4wOTYgMi4wMyA2LjUxNGMuMzQ0IDIuOTUzIDUuNzI1IDYuNDc5IDUuOTYzIDYuNDg3LjIzOC4wMDggNS43MzgtMy43MjIgNS45ODgtNi41QzE0LjE4OCA0LjIwMSAxMi41MDcgMyAxMC44MDUgM3oiIGZpbGw9IiM5OTkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg=="
            />
            <div className={style['descriptor-text']}>
              {props.song.like_count} Likes
            </div>
          </div>
          <span className={style.view}>View All</span>
        </div>
        <div>
          {props.users.slice(0, 9).map((user, index) => {
            return <User key={user.id} user={user} z={index} />;
          })}
        </div>
      </div>
    );
  }
  if (props.type === 'reposts') {
    return (
      <div className={style['master-container']}>
        <div className={style.topbar}>
          <div className={style.descriptor}>
            <img
              className={style['reposts-icon']}
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c3RhdHNfcmVwb3N0PC90aXRsZT48cGF0aCBkPSJNMiA2djVjMCAxLjEwNS45MDIgMiAyLjAwOSAyaDYuOTg3SDEwbC0yLTJINFY2aC0uNUg2TDMgMyAwIDZoMnptNC0zaC0uOTk2IDYuOTg3QzEzLjA5OCAzIDE0IDMuODk1IDE0IDV2NWgtMlY1SDhMNiAzem0xMCA3aC02bDMgMyAzLTN6IiBmaWxsPSIjOTk5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4="
            />
            <span className={style['descriptor-text']}>
              {props.song.repost_count} Reposts
            </span>
          </div>
          <span className={style.view}>View All</span>
        </div>
        <div>
          {props.users.slice(0, 9).map(user => {
            return <User key={user.id} user={user} />;
          })}
        </div>
      </div>
    );
  }
};

export default InteractionContainer;
