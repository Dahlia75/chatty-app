import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      // <div className="message system">
      //   Anonymous1 changed their name to nomnom.
      //   <div className="message-username" { this.props.username }/>
      //   <div className="message-content" { this.props.content }/>
      // </div>
      <div className="message">
        <span className="message-username">{this.props.SingleMessage.username}</span>
        <span className="message-content">{this.props.SingleMessage.content}</span>
      </div>
    );
  }
}

export default Message;
