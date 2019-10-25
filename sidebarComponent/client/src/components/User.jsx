import React from 'react';
import UserProfile from './UserProfile.jsx';
import {
  Triangle,
  TriangleBorder,
  TriangleCover,
  MouseBridge
} from './Triangle.jsx';
import style from './User.css';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverState: false
    };
    this.toggleHover = this.toggleHover.bind(this);
  }

  toggleHover() {
    this.setState({ hoverState: !this.state.hoverState });
  }

  render() {
    return (
      <div
        style={{
          zIndex: this.props.z
        }}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        className={style.container}
      >
        {this.state.hoverState && <TriangleBorder />}
        {this.state.hoverState && <Triangle />}
        {this.state.hoverState && <UserProfile user={this.props.user} />}
        {this.state.hoverState && <TriangleCover />}
        {this.state.hoverState && <MouseBridge />}

        <img className={style.avatar} src={this.props.user.avatar_url} />
      </div>
    );
  }
}

export default User;
