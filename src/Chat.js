import React, { Component } from 'react';
import './App.css';

class Chat extends Component {
  constructor(props){
    super(props);
    this.state={
      name: this.props.name,
      friend: this.props.friend,
      contentBox: "",
      messages: []
    }

    this.replies = [
      "Really?",
      "Good to know...",
      "You don't say?",
      "You're so funny!",
      "That happened to a friend of mine",
      "You can say that again!",
      "I'm up for anything",
      "Everything is better naked",
      "Not even!",
      "I'm with you, mate!",
      "Sorry, I wasn't listenting",
      "Is that Gaelic?",
      "I believe those columns are Corinthian...",
      "My aunt died!",
      "Have you ever eaten human flesh?",
      "I agree... what are you doing tonight",
      "I need to wash my hair",
      "I think I blacked out",
      "Wait! Who are you, again?",
      "I'm not wearing any underwear..."
    ]
    this.updateContent = this.updateContent.bind(this)
    this.handleSend = this.handleSend.bind(this)
    this.respond = this.respond.bind(this)
    this.otherRespond = this.otherRespond.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
    this.divify = this.divify.bind(this)
  }
  updateContent(event){
    this.setState({contentBox: event.target.value})
  } 
  respond(){
    let t = new Date().toLocaleTimeString()
    let newMessage = {name: this.state.friend, msg: this.replies[Math.floor(Math.random() * 20)], time: t}
    this.setState({messages: this.state.messages.concat(newMessage)})
    this.scrollToBottom();
    let oneIn5 = Math.floor(Math.random() * 5) +1
    console.log(oneIn5);
    if(oneIn5 === 3){
      setTimeout(this.otherRespond, 2000);
    }
  }

  otherRespond(){
    let t = new Date().toLocaleTimeString()
    let oneIn3 = Math.floor(Math.random() * 3) +1
    let friendName = "";
    if(oneIn3 === 1){
      friendName = "sue";
    }else if(oneIn3 === 1){
      friendName = "nancy";
    }else{
      friendName = "andrew";
    }
  
    let newMessage = {name: friendName, msg: this.replies[Math.floor(Math.random() * 20)], time: t}
    console.log("the other friend is "+ friendName);
    this.setState({messages: this.state.messages.concat(newMessage)})
    this.scrollToBottom();
  }

  handleSend(event){
    event.preventDefault()
    let t = new Date().toLocaleTimeString()
    let newMessage = {name: this.state.name, msg: this.state.contentBox, time: t}
    this.setState({messages: this.state.messages.concat(newMessage), contentBox: ""})
    setTimeout(this.scrollToBottom, 10);
    setTimeout(this.respond, 2000);
  }

  scrollToBottom(){
    this.chat1.scrollTop = this.chat1.scrollHeight;
  }

  divify(x){
    let retDiv;
    let message = x.msg;
    let name = x.name;
    let t = x.time;
    if (name === this.state.name){
      retDiv = <div className='container'> 
                <img src={require("./images/" + name + ".png")} title={name} alt="Avatar"></img> 
                <p>{message}</p> 
                <span className='time-right'>{t}</span> 
                </div>
    }else{
      retDiv = <div className='container darker'>
                <img src={require("./images/" + name + ".png")} title={name} alt="Avatar" className='right'></img> 
                <p>{message}</p> 
                <span className='time-left'>{t}</span> 
                </div>
    }
    return(retDiv)
  }

  render() {
    let displayed;
    if(this.state.messages.length > 0){
      displayed = this.state.messages.map(this.divify)
    }
    
    return (
      <div>
        <div className="chatapp" ref={r => this.chat1 = r}>
            {displayed}
            <form onSubmit={this.handleSend} className="chatForm">
              <input 
                  type="text"
                  value={this.state.contentBox}
                  onChange={this.updateContent} 
                  className="chatInput"
                  autoFocus={true}
              />
              <input type="submit" value="Send" className="sendBtn" />
            </form>
        </div>
      </div>
    );
  }
}

export default Chat;
