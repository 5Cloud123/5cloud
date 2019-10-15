import React from 'react';
import User from './User.jsx';

let InteractionContainer = props => {
  if (props.type === 'likes') {
    return (
      <div>
        <span>{props.song.like_count}</span>
        <span>Likes</span>
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
      <div>
        <span>{props.song.repost_count}</span>
        <span>Reposts</span>
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
