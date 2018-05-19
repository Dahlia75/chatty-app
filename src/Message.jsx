import React, { Component } from 'react';

class Message extends Component {
  checkImageInMsg(){
    //check the URL format
    const imageCheck = /https?:\/\/.*?\.(jpe?g|png|gif)/i;
    //Does the text contains image?
    const isLink = word => imageCheck.test(word);
    if (isLink(this.props.singleMessage.content)){
      const splitMsg = this.props.singleMessage.content.split(' ')
      .reduce((acc, current) => {
        const last = arr => arr[arr.length - 1];
        if (acc.length === 0 || isLink(last(acc)) || isLink(current)) {
          acc.push(current);
        } else {
          acc[acc.length - 1] = last(acc) + ' ' + current;
        }
        return acc;
      }, []);
      const multipleComponents = splitMsg.map(function(item, index) {
        console.log("item: ", item);
        if (imageCheck.test(item)) {
          return <img className="message-image" key={index} src={item} />
        } else {
          return <span className="message-content" key={index} >{item}</span>
        }
      });
      console.log("split: ", multipleComponents);
      return multipleComponents;
    } else {
      return <span className="message-content">{this.props.singleMessage.content}</span>
    }
  }

  render() {
    var msg;
    switch(this.props.singleMessage.type){
      case "incomingMessage":
        const msgContent = this.checkImageInMsg();
        let style = {color: this.props.singleMessage.userColor};

        msg = (
          <div className="message">
            <span className="message-username" style={style}>{this.props.singleMessage.username}</span>
            <div className="message-content-wrapper">
              {msgContent}
            </div>
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
