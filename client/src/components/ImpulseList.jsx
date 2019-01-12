import React, { Component } from 'react';
import { UserConsumer } from "../utils/UserContext";

class ImpulseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      impulses: null
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      if (this.props.user) {
        this.fetchImpulses();
      }
    }
  }
  
  fetchImpulses = () => {
    const userId = this.props.user.id;
    fetch(`http://localhost:3000/users/${userId}/impulses`, {
      method: "GET",
      credentials: "include"
    })
    .then(response => response.json())
    .then(data => this.setState({
      impulses: data.impulses
    }))
  }

  render() {
    if (!this.state.impulses) { return null; }
    return (
      this.state.impulses.map((impulse) => (
        <h1 key={impulse.id}>{impulse.name}</h1>
      ))
    )
  }
}


export default React.forwardRef((props, ref) => (
  <UserConsumer>
    {user => <ImpulseList {...props} user={user} ref={ref} />}
  </UserConsumer>
));
