import React, { Component } from 'react';
import { Form, Text } from 'informed';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    // Remember! This binding is necessary to make `this` work in the callback
    this.submit = this.submit.bind(this);
    this.setFormApi = this.setFormApi.bind(this);
  }

  submit() {
    const {email, password} = this.formApi.getState().values;

    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ auth: { email, password } })
    })
    .then(response => console.log("response: ", response.json()))
  }

  getCookie = (name) => {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  getImpulses = () => {
    const jwt = this.getCookie("jwt");
    fetch("http://localhost:3000/users/3/impulses", {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + jwt,
      }
    })
  }

  setFormApi(formApi) {
    this.formApi = formApi;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Login</h1>
          <Form id="login-form" getApi={this.setFormApi}>
            <label htmlFor="login-email">Email:</label>
            <Text field="email" id="login-email" />
            <label htmlFor="login-password">Password:</label>
            <Text type="password" field="password" id="login-password" />
            <button type="submit" onClick={this.submit}>Submit</button>
          </Form>
          
          <button type="submit" onClick={this.getImpulses}>Get Impulses</button>
        </header>
      </div>
    );
  }
}

export default App;
