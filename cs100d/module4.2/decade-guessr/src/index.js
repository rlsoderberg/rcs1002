import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import nextphoto from './server.py';
import axios from 'axios';

class Main extends React.Component {
  constructor() {
    super()
    this.state = {filename: 'dglogo.jpg'}
    this.urlbase = 'http://127.0.0.1:5000'
}
  resetdb() {
    axios.get(this.urlbase + '/resetdb').then((resp) => {
        alert(resp.data)
    })
}
login() {
  const {filename, decade, title} = this.state
  var url = '/login'
  // Store the user's name in a JSON object
  const body = {'filename': filename}
  // We're sending JSON data to our server
  const headers = { "Content-Type": "application/json" }
  // Configuration information for the server
  const config = {
      url: url,
      baseURL: this.urlbase,
      method: 'POST',
      headers: headers,
      data: body
  }
  //i don't get any of these consts up here! i tried deleting them, but apparently you HAVE to define config! i mean... it is used in this axios thing
  //what i don't get, is the difference between this and resetdb! 
axios(config).then((resp) => {
  this.setState({...this.state, 
      filename: resp.data['filename']
  })
}).catch(error => {
  console.log(error)
})
}
  
      render() {
          const {filename} = this.state
          const address = (filename) => {
            return './photos/' + filename;
          }
          return (
              <div className='Main'>
                  <div className = 'img'>
                    <img src = {address(filename)} width="500" height="300" alt="decadeGuessr Photo"></img>
                  </div>

                  <div className = 'desc'>
                      <p>
                          Filename: {filename} <br />
                          Address: {address(filename)}
                      </p>
                      <button type="button" onClick={this.login.bind(this)}>New Photo</button>
                  </div>                  
              </div>
                )
              }
  }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);