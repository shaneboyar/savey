import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { UserProvider } from "./utils/UserContext";
import LoginForm from './components/LoginForm';
import ImpulseList from './components/ImpulseList';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    this.authenticateUser();
  }
  
  authenticateUser = () => {
    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => this.setState({
      user: data.user
    }))
  }

  render() {
    const { user } = this.state;
    return (
      <UserProvider value={this.state.user}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            { !user.email &&  <LoginForm onSuccessfulLogin={this.authenticateUser}/> }
            { user.email && <ImpulseList /> }         
          </header>
        </div>
      </UserProvider>
    );
  }
}

export default App;
