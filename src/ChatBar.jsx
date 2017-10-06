import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.onEnter = this.onEnter.bind(this);
  }

  onEnter(target) {
    if(target.key === 'Enter') {
      this.props.chatBox(document.getElementById('chatBarUsername').value,
        document.getElementById('chatBarMessage').value),
        document.getElementById('chatBarUsername').value = '',
        document.getElementById('chatBarMessage').value = ''
    }
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" id="chatBarUsername" placeholder="Your Name (Optional)" />
        <input className="chatbar-message" id="chatBarMessage" placeholder="Type a message and hit ENTER" onKeyUp={this.onEnter} />
      </footer>
    );
  }
}
export default ChatBar;