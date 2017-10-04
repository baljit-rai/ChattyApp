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
    }
  }



componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {key: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}

  render() {
    return (
      <div>
        <ChatBar name={this.state.currentUser.name}/>
        <Navigation/>
        <MessageList allMessages={this.state.messages}/>
      </div>
    );
  }
}
export default App;