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
        document.getElementById('chatBarMessage').value = ''
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" id="chatBarUsername" placeholder="Your Name (Optional)" onKeyUp={this.onEnter} />
        <input className="chatbar-message" id="chatBarMessage" placeholder="Type a message and hit ENTER" onKeyUp={this.onEnter} />
      </footer>
    );
  }
}
export default ChatBar;