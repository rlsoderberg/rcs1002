import { useState } from 'react';

class Square extends React.Component {
  
  constructor() {
    super()
    this.urlbase = 'http://localhost:5000'
    this.state = {isLoggedIn: 0}
  }

  login() {
    if (isLoggedIn === 0) {
      content = 0;
    } else {
      content = 1;
    }
  }

  render() {
    return (
      <>
      {content}
      <button onClick={() => this.setState({isLoggedIn: 1})}>Log In</button>
      </>
    );
  }
}