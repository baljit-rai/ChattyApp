import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import Navigation from './Navigation.jsx'
import MessageList from './MessageList.jsx'

var connectSocket = new WebSocket ('ws://localhost:3001');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'}, //if currentUser is not defined, it means the user is Anonymous
      messages: [],
      notifications: [],
      onlineUsers: 0
    };
    this.chatBox=this.chatBox.bind(this)
  }

//Send msg to websocket
chatBox(newUser, newMessage) {
  if(this.state.currentUser.name === newUser || newUser === '') {
  // Add a new message to the list of messages in the data store
    const newestMessage = {
    type: 'postMessage',
    username: this.state.currentUser.name,

    content: newMessage};
  connectSocket.send(JSON.stringify(newestMessage))
  } else {
    this.setState({currentUser: {name: newUser}});
  connectSocket.send(JSON.stringify({
    type: 'postNotification',
    oldUsername: this.state.currentUser.name,
    newUsername: newUser
  }))

  const newestMessage = {
    type: 'postMessage',
    username: newUser,
    content: newMessage};
  connectSocket.send(JSON.stringify(newestMessage))
}

  //Send the msg object as a JSON-formatted string
  document.getElementById('chatBarMessage')
}

//Recieve message from websocket
componentDidMount() {
  connectSocket.addEventListener('message', event => {
    var newestMessage = JSON.parse(event.data);
    this.setState({onlineUsers:newestMessage.count});
    switch(newestMessage.type) {
      case 'incomingMessage': {
        if (newestMessage.content != '') {
          const displayMSG = this.state.messages;
          displayMSG.push({
            type: 'incomingMessage',
            key: newestMessage.key,
            username: newestMessage.username,
            content: newestMessage.content,
          });
          this.setState({messages: displayMSG});
        }
        break;
      }
      case 'incomingNotification': {
        if (newestMessage.newUsername != newestMessage.oldUsername) {
          const displayMSG = this.state.messages
          displayMSG.push({
            type: 'incomingNotification',
            key: newestMessage.key,
            oldUsername: newestMessage.oldUsername,
            newUsername: newestMessage.newUsername
          });
          this.setState({messages: displayMSG});
        }

      }
    }
  })

}

  render() {
    return (
      <div>
        <ChatBar chatBox={this.chatBox} chatBarname={this.state.currentUser.name}/>
        <Navigation onlineUsers = {this.state.onlineUsers}/>
        <MessageList allMessages={this.state.messages}/>
      </div>
    );
  }
}
export default App;