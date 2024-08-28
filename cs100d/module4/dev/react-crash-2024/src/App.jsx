import { useState } from 'react';

constructor() {
  super()
  //Initial data has no user or counts
  this.urlbase = 'http://localhost:5000'
  this.state = {rand:0, id: 0, filename:'', decade:'', source:'', info:'', title:'', count: '', result: ''}
  this.state = {filename: 'Untitled-1.jpg', decade: '1860s', title: 'Guess which decade the photo is from'}
}

let content;

const constructor = {
 this.state = {
   isLoggedIn: 1
};
}

function AdminPanel() {
  <h1>AdminPanel</h1>
}

function LoginForm() {
  <h1>LoginForm</h1>
}

function LogIn{

}

if (isLoggedIn === 1) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
    <button onClick={() => this.setState({type: 2})}>Log In</button>
  </div>
);
