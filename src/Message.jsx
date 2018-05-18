import React, { Component } from 'react';

class Message extends Component {
  checkImageInMsg(){
    const imageCheck = /^https?:\/\/.*?\.(jpe?g|png|gif)$/i;

    console.log("Does text contain image: ", imageCheck.test(this.props.singleMessage.content));
    // const splitMsg = this.props.singleMessage.content.split(imageCheck).map(function(item) {
    //   console.log("item: ", item);
    //   if (imageCheck.test(item)
    //     ) {
    //       return <img className="message-image" src={item} />
    //     }else {
    //       return <span className="message-content">{item}</span>
    //     }

    //     // <br/>
    // });
    // console.log("split: ", splitMsg);
    if (imageCheck.test(this.props.singleMessage.content)
    ) {
      return <img className="message-image" src={this.props.singleMessage.content} />
    }else {
      return <span className="message-content">{this.props.singleMessage.content}</span>
    }
    // return splitMsg;
  }

  render() {
    var msg;
    switch(this.props.singleMessage.type){
      case "incomingMessage":
        const msgContent = this.checkImageInMsg();
        // console.log("msgContent: ",msgContent);
        let style = {color: this.props.singleMessage.userColor};

        msg = (
          <div className="message">
            <span className="message-username" style={style}>{this.props.singleMessage.username}</span>
            {msgContent}
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
