import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx'
import Navigation from './Navigation.jsx'
import MessageList from './MessageList.jsx'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "<3 Ashley the Secratary <3"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          key: 0
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          key: 1
        }
      ]
    };
    this.chatBox=this.chatBox.bind(this)
  }



chatBox(newUser, newMessage) {
  console.log("componentDidMount <App />");
  console.log(newMessage + "from" + newUser);
  let newKey = this.state.messages.length + 1;
  // Add a new message to the list of messages in the data store
  const newestMessage = {key: newKey, username: newUser, content: newMessage};
  const messages = this.state.messages.concat(newestMessage)
  // Update the state of the app component.
  // Calling setState will trigger a call to render() in App and all child components.
  this.setState({messages: messages});
  document.getElementById('chatBarMessage')
}

  render() {
    return (
      <div>
        <ChatBar chatBox={this.chatBox} chatBarname={this.state.currentUser.name}/>
        <Navigation/>
        <MessageList allMessages={this.state.messages}/>
      </div>
    );
  }
}
export default App;