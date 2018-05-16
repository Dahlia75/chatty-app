import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      console.log(event.target.value);
      this.props.onNewMessage(event.target.value);
    }
  }


  render() {

    return(
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser} />
        <input className="chatbar-message" onKeyPress={this.handleKeyPress} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;