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
