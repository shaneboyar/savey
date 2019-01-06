import React from 'react';
import { UserConsumer } from "./utils/UserContext";

const ImpulseList = () => (
  <UserConsumer>
    {value => (
      value.user.email &&
      <h1>User!</h1>
    )}
  </UserConsumer>
)
