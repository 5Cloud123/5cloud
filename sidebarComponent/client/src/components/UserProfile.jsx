import React from 'react';
import style from './UserProfile.css';
let UserProfile = function(props) {
  return (
    <div className={style.container}>
      <img className={style.art} src="./assets/pictures/sample.jpg" />
      <div className={style.username}>{props.user.username}</div>
      <div className={style['follower-count']}>
        <img className={style['followers-icon']} />
        {props.user.follower_count}
      </div>
      <button className={style['follow-button']}>Follow</button>
    </div>
  );
};

export default UserProfile;
