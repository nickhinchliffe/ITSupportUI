import {style} from './App.css';
import React from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

var client = 0;
var clientOn = false; 
var clientOpen = false;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{
        user: 'System',
        text: 'Please press enter to connect to the server'
      }]
    };

  }
  
  updateMessages = (obj) => {
    const cState = this.state.messages
    const updatedState = cState.concat(obj);
    const toServer = obj;
    const toServerText = obj.text;
    this.setState({
      messages : updatedState
    })

    if(clientOn === false){
      client = new W3CWebSocket('ws://127.0.0.1:9000');
      console.log("Client socket created")
      clientOn = true
    }
    client.onopen = () =>{
      clientOpen = true;
    }
    
    if(clientOpen === true){
      client.send(toServerText);
    }

    client.onmessage = (message) =>{
      console.log(message.data)
      const dataSrv = message.data;
      const cState3 = this.state.messages
      const staffObj = {
      user: 'User',
      text: dataSrv
    }
  
    const updatedState3 = cState3.concat(staffObj);
    this.setState({
      messages: updatedState3
    })

    }
  }
  
  render() {
    return(
      <div>
        <div style={{display: "block", margin: "auto"}}>
        <MessageArea messages={this.state.messages}/>
        <UserInput updateMessages = {this.updateMessages}/>
        </div>
      </div>
      );
  }
}

class MessageArea extends React.Component {
  render() {
    return(
        <div className="container" style = {{border: '1px solid black', display:"block", height: '500px' , width: '70%', margin:"auto"}}>
          {this.props.messages.map(item => (
            <div style= {{margin: "10px"}}>
              <div className="userNameDisp" key={item}>{item.user}</div>
              <div className="userTextDisp" key={item}>{item.text}</div>
            </div>
            ))}
        </div>
      );
  }
}

class UserInput extends React.Component {
  constructor(){
    super();
    this.state ={
      user : 'IT Support Staff:',
      text : ''
    };
  }

  handleSubmit() {
    this.props.updateMessages(this.state)
    this.setState({
      text: ''
    })
    Array.from(document.querySelectorAll("input#userInput")).forEach(
      input => (input.value = "")
    );
  }
  
  handleEnter(e){
    e.preventDefault();
    console.log("Enter hit");
  }

  
  render(){
    return(
      <div>
        <form onSubmit={this.handleEnter}>
          <div className="secondContainer" style={{position: "absolute", width:"20%", left:"15%"}}>
          <label>
            <input type="text" id="userInput" placeholder="Aa" onChange={e => this.setState({text: e.target.value})}/>
          </label>
            <button type="submit" onClick={() => this.handleSubmit()}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
