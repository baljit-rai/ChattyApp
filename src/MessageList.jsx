import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {


  render() {

    return (
      <main className='messages'>
      {this.props.allMessages.map(eachMSG => {
        if(eachMSG.type === 'incomingMessage') {
        return <Message
        key={eachMSG.key}
        username ={eachMSG.username}
        content ={eachMSG.content} />
        }
        if(eachMSG.type === 'incomingNotification') {
          return <Message
          key={eachMSG.key}
          content={eachMSG.oldUsername + ' changed name to ' + eachMSG.newUsername}/>
        }
      }
      )
  }</main>)
}
}
export default MessageList;