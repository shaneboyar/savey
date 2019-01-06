import React, { Component } from 'react';
import { Form, Text } from 'informed';

class LoginForm extends Component {

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
      body: JSON.stringify({ email, password })
    })
    .then(response => this.props.onSuccessfulLogin())
  }

  // getImpulses = () => {
  //   fetch("http://localhost:3000/users/1/impulses", {
  //     method: "GET",
  //     credentials: 'include'
  //   })
  // }

  setFormApi(formApi) {
    this.formApi = formApi;
  }

  render() {
    return (
      <div className="LoginForm">
        <h1>Login</h1>
        <Form id="login-form" getApi={this.setFormApi}>
          <label htmlFor="login-email">Email:</label>
          <Text field="email" id="login-email" />
          <label htmlFor="login-password">Password:</label>
          <Text type="password" field="password" id="login-password" />
          <button type="submit" onClick={this.submit}>Submit</button>
        </Form>
      </div>
    );
  }
}

export default LoginForm;
