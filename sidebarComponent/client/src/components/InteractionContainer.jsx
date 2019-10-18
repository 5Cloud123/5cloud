import React from 'react';
import User from './User.jsx';
import style from './InteractionContainer.css';

let InteractionContainer = props => {
  if (props.type === 'likes') {
    return (
      <div className={style['master-container']}>
        <div className={style.topbar}>
          <div className={style.descriptor}>
            <img className={style['likes-icon']} />
            <span className={style['descriptor-text']}>
              {props.song.like_count} Likes
            </span>
          </div>
          <span className={style.view}>View All</span>
        </div>
        <div>
          {props.users.map((user, index) => {
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
            <img className={style['reposts-icon']} />
            <span className={style['descriptor-text']}>
              {props.song.repost_count} Reposts
            </span>
          </div>
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
