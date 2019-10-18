import React from 'react';
import style from './UserProfile.css';
let UserProfile = function(props) {
  return (
    <div className={style.container}>
      <img className={style.art} src="./assets/pictures/sample.jpg" />
      <div className={style.username}>{props.user.username}</div>
      <div className={style.followers}>
        <img className={style['followers-icon']} />
        <span className={style['follower-count']}>
          {props.user.follower_count}
        </span>
      </div>
      <button className={style['follow-button']}>Follow</button>
    </div>
  );
};

export default UserProfile;
