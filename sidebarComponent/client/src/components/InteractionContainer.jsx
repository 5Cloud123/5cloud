import React from 'react';
import User from './User.jsx';

let InteractionContainer = props => {
  if (props.type === 'likes') {
    return (
      <div>
        <span>{props.song.likes} Likes</span>
        {props.users.map(user => {
          return <User key={user.id} user={user} />;
        })}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default InteractionContainer;
