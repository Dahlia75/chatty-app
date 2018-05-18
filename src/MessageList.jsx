import React, { Component } from 'react';

import Message from './Message.jsx';

class MessageList extends Component {
  render() {

  const messages = this.props.Messages.map((sMessage) =>(
      <Message key={sMessage.id} singleMessage={sMessage}/>
    ));

    return (
      <main className="messages">
        {messages}
      </main>
    );
  }
}

export default MessageList;
