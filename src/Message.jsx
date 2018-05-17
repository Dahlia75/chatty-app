import React, { Component } from 'react';

class Message extends Component {
  render() {
    var msg;
    switch(this.props.singleMessage.type){
      case "incomingMessage":
        let style = {color: this.props.singleMessage.userColor};
        msg = (
          <div className="message">
            <span className="message-username" style={style}>{this.props.singleMessage.username}</span>
            <span className="message-content">{this.props.singleMessage.content}</span>
          </div>);
        break;
      case "incomingNotification":
        msg = (
          <div className="notification">
            <span className="notification-content message system">{this.props.singleMessage.content}</span>
          </div>);
        break;
    }
    return msg;
  }
}

export default Message;
