import {style} from './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{
        user: '',
        text: ''
      }]
    };

  }
  
  updateMessages = (obj) => {
    const cState = this.state.messages
    const updatedState = cState.concat(obj);
    const toBot = obj;
    this.setState({
      messages : updatedState
    })
    axios.post("http://localhost:3001/", toBot).then(res => {
      var msgBot = res.data.output.generic[0].text
      const cState2 = this.state.messages
      const botObj = {
        user: 'ITSupportBot:',
        text: msgBot
      }
      const updatedState2 = cState2.concat(botObj);
      this.setState({
        messages: updatedState2
      })
    }).catch(e => {
      console.error(e);
    })
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
      user : 'Staff:',
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
