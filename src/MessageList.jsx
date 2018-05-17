import React, { Component } from 'react';

import Message from './Message.jsx';

class MessageList extends Component {
  render() {

  const Messages = this.props.Messages.map((SMessage) =>(
      <Message key={SMessage.id} SingleMessage={SMessage}/>
    ));

    return (
      <main className="messages">
      {Messages}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>

    );
  }
}

export default MessageList;
