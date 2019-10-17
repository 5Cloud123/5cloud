import React from 'react';
import UserProfile from './UserProfile.jsx';
import Triangle from './Triangle.jsx';
import TriangleBorder from './TriangleBorder.jsx';
import TriangleCover from './TriangleCover.jsx';
import MouseBridge from './MouseBridge.jsx';
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
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        className={style.container}
      >
        {this.state.hoverState && <TriangleBorder />}
        {this.state.hoverState && <Triangle />}
        {this.state.hoverState && <UserProfile user={this.props.user} />}
        {this.state.hoverState && <TriangleCover />}
        {this.state.hoverState && <MouseBridge />}

        <img className={style.avatar} src="./assets/pictures/sample.jpg" />
      </div>
    );
  }
}

export default User;
