import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.userKeyPress = this.userKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.onNewMessage(event.target.value);
      event.target.value = '';
    }
  }


  userKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.onNewUser(event.target.value);
    }
  }

  render() {

    return(
      <footer className="chatbar">
        <input className="chatbar-username" onKeyPress={this.userKeyPress} defaultValue={this.props.currentUser} />
        <input className="chatbar-message" onKeyPress={this.handleKeyPress} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;