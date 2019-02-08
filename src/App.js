import React, { Component } from 'react';
import './App.css';
import Chat from './Chat.js'

class App extends Component {
  constructor(){
    super();
    this.state={
      startScreen: true,
      submitOK: false,
      name: ""
    }

    this.showStart = this.showStart.bind(this)
    this.showChat = this.showChat.bind(this)
    this.selectImg = this.selectImg.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.hideBox = this.hideBox.bind(this) 
  }

  selectImg(event){
    let img = event.target;
    console.log("Image selected = " + img.title);
    this.setState({name: img.title, submitOK: true})
    img.style.opacity = 1;

  }

  handleSubmit(event){
    event.preventDefault();
    this.setState({startScreen: false})
  }

  hideBox(event){
    let btn = event.target;
    console.log(btn.id);
    if(btn.id === "box1bnt"){
      if(this.box1.style.display === "none"){
        this.box1.style.display = "block";
        btn.innerHTML = "Hide Box 1";
      }else{
        this.box1.style.display = "none";
        btn.innerHTML = "Show Box 1";
      }
    }else{
      if(this.box2.style.display === "none"){
        this.box2.style.display = "block";
        btn.innerHTML = "Hide Box 2";
      }else{
        this.box2.style.display = "none";
        btn.innerHTML = "Show Box 2";
      }
    }
  }

  showStart(){
    return(<div className="chatapp">
          <div id="selectTitle"><h3>Choose an icon</h3></div>
          <div id="startForm">
              <img src={require('./images/john.png')} 
                title="john" 
                alt="Avatar"
                onClick={this.selectImg}
                ></img> 
              <img src={require('./images/bob.png')} 
                title="bob" 
                alt="Avatar"
                onClick={this.selectImg}
                ></img> 
              <img src={require('./images/andrew.png')} 
                title="andrew" 
                alt="Avatar"
                onClick={this.selectImg}
                ></img> 
              <img src={require('./images/nancy.png')} 
                title="nancy" 
                alt="Avatar"
                onClick={this.selectImg}
                ></img> 
              <img src={require('./images/sue.png')} 
                title="sue" 
                alt="Avatar"
                onClick={this.selectImg}
                ></img> 
            <form onSubmit={this.handleSubmit} className="selectForm">
              <div>
                <input type="submit" disabled={!this.state.submitOK}/>
              </div>
            </form>
          </div>
        </div>)
  }

  showChat(){
    return(<div>
             <div id="wrapper">
              <div ref={r => this.box1 = r}><Chat name={this.state.name} friend="bob" /></div>
              <div ref={r => this.box2 = r}><Chat name={this.state.name} friend="nancy" /></div>
            </div>
            <div id="bottomBtnsDiv">
            <button id="box1bnt" className="bottomBtns" onClick={this.hideBox}>Hide Box 1</button>
            <button id="box2bnt" className="bottomBtns" onClick={this.hideBox}>Hide Box 2</button>
            </div>
          </div>
          )
  }

  render() {
    return (
      <div>
        <nav id="title">The Chat App</nav>
        {this.state.startScreen ? this.showStart() : this.showChat() }
      </div>
    );
  }
}

export default App;
