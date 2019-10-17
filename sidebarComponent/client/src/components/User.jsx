import React from 'react';
import UserProfile from './UserProfile.jsx';
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
      <div className={style.container}>
        {this.state.hoverState && <UserProfile user={this.props.user} />}
        <img
          onMouseEnter={this.toggleHover}
          onMouseLeave={this.toggleHover}
          className={style.avatar}
          src="./assets/pictures/sample.jpg"
        />
      </div>
    );
  }
}

export default User;
