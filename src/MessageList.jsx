import React, { Component } from 'react';

import Message from './Message.jsx';

class MessageList extends Component {
  render() {

  const Messages = this.props.Messages.map((sMessage) =>(
      <Message key={sMessage.id} singleMessage={sMessage}/>
    ));

    return (
      <main className="messages">
        {Messages}
      </main>
    );
  }
}

export default MessageList;
