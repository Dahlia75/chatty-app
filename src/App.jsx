import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
      noOfClients: 0,
    };

    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewUser = this.onNewUser.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.addEventListener('open', (event) => {
      console.log('Connect to Server');
    });
    this.socket.addEventListener('message', (messageEvent) => {
      const messageObject = JSON.parse(messageEvent.data);
      console.log("received messge on client side: ",messageObject);
      if (messageObject.type === 'usersCount'){
        this.setState({
          noOfClients: messageObject.content,
        });
      } else {
          this.setState({
            messages: [...this.state.messages, messageObject],
          });
        }
    });
  }
  onNewMessage(newMassage){
    const newMsge = { type: 'postMessage',
                      username: this.state.currentUser.name,
                      content: newMassage};
    const messages = this.state.messages.concat(newMsge);
    this.socket.send(JSON.stringify(newMsge));
  }

  onNewUser(newUser){
    const notificationMsg = {
      type: 'postNotification',
      content: `*** User ${this.state.currentUser.name} has changed his name to User ${newUser}. ***`,
    }
    console.log("notification message: ", notificationMsg);
    const newCurrentUser = {name: newUser};
    this.setState({currentUser: newCurrentUser});
    this.socket.send(JSON.stringify(notificationMsg));
  }

  render() {
      return (
        <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-brand navbar-users">{this.state.noOfClients} Users online</span>
        </nav>
        <MessageList Messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} onNewMessage={this.onNewMessage} onNewUser={this.onNewUser} />
        </div>
      );
  }
}
export default App;