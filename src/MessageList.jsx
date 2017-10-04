import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {


  render() {

    return (
      <main className='messages'>
      {this.props.allMessages.map(eachMSG => {
        return <Message key ={eachMSG.key} username ={eachMSG.username} content ={eachMSG.content}/>
      })
      }
        </main>
      )
      }
}
export default MessageList;
