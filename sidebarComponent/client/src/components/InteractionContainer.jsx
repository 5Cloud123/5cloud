import React from 'react';
import User from './User.jsx';
import style from './InteractionContainer.css';

let InteractionContainer = props => {
  if (props.type === 'likes') {
    return (
      <div className={style['master-container']}>
        <div className={style.topbar}>
          <span className={style.descriptor}>
            {props.song.like_count} Likes
          </span>
          <span className={style.view}>View All</span>
        </div>
        <div>
          {props.users.map(user => {
            return <User key={user.id} user={user} />;
          })}
        </div>
      </div>
    );
  }
  if (props.type === 'reposts') {
    return (
      <div className={style['master-container']}>
        <div className={style.topbar}>
          <span className={style.descriptor}>
            {props.song.repost_count} Reposts
          </span>
          <span className={style.view}>View All</span>
        </div>
        <div>
          {props.users.map(user => {
            return <User key={user.id} user={user} />;
          })}
        </div>
      </div>
    );
  }
};

export default InteractionContainer;
