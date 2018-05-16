import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          key: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          key: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };

    this.onNewMessage = this.onNewMessage.bind(this);
  }

  // GenerateMessageKey(){
  //   const randoIndex = Math.floor(Math.random(6) * 100);
  //   this.state.messages.map(message => (message.setState.key = randoIndex;));

  // }

  componentDidMount() {
    //console.log("componentDidMount <App />");
    this.socket = new WebSocket('ws://localhost:3001');
    console.log(this.socket.readyState === 0 );
    this.socket.addEventListener('open', (event) => {
      console.log('Connect to Server');
    });
    // this.socket.addEventListener('message', (messageEvent) => {
    //   console.log('Connected to Server');
    //   const messageObject = JSON.parse(messageEvent.data);
    //   this.setState({
    //     messages: [...this.state.messages, messageObject],
    //   })
    // });
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }
  onNewMessage(newMassage){
    const newMsge = {id: 3, username: "Michelle", content: newMassage};
    const messages = this.state.messages.concat(newMsge);
    this.setState({messages: messages});
  }

  render() {
      return (
        <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList Messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} onNewMessage={this.onNewMessage}/>
        </div>
      );
  }
}
export default App;