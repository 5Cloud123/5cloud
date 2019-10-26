import React from 'react';
import style from './UserProfile.css';
let UserProfile = function(props) {
  return (
    <div className={style.container}>
      <img className={style.art} src={props.user.avatar_url} />
      <div className={style.username}>{props.user.username}</div>
      <div className={style.followers}>
        <img
          className={style['followers-icon']}
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0icmdiYSgxNTMsIDE1MywgMTUzLCAwLjcpIiBkPSJNMTguNCAxOC41bDIuNSA1IC4yLjVIMjhsLTIuMS00LjMtNC4xLTEuNXYtMi41YzEuMi0xLjEgMS44LTMuMiAxLjgtNS4xIDAtMi4xLTItMy42LTMuNS0zLjZzLTMuNSAxLjYtMy41IDMuNmMwIDEuOS41IDQgMS44IDUuMXYyLjVoLS4xbC4xLjN6Ii8+PHBhdGggZmlsbD0iIzk5OSIgZD0iTTE3LjUgMTlsLTUtMS44di0zYzEuNC0xLjIgMi0zLjggMi01LjkgMC0yLjQtMi4zLTQuMy00LTQuMy0xLjcgMC00IDEuOC00IDQuMyAwIDIuMi42IDQuNyAyIDUuOXYzbC01IDEuOEwxIDI0aDE5bC0yLjUtNXoiLz48L3N2Zz4="
        />
        <span className={style['follower-count']}>
          {props.user.follower_count}
        </span>
      </div>
      <div className={style.location}>{props.user.phys_location}</div>
      <button className={style['follow-button']}>Follow</button>
    </div>
  );
};

export default UserProfile;
