import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import nextphoto from './server.py';

class Main extends React.Component {
  constructor() {
    super()
    //Initial data has no user or counts
    this.state = {filename: null, decade: null, copyright: null, info: null, title: null}
    this.urlbase = 'http://127.0.0.1:5000'
}
    
    getnext() {
      const {user} = this.state
      var url = '/login'
      // Store the user's name in a JSON object
      const body = {'user': user}
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
  
      render() {
          const {filename, decade, copyright, info, title} = this.state
          return (
              <div className='Main'>

                  <div className = 'img'>
                      <img src = 'img_path'></img>
                  </div>

                  <div className = 'desc'>
                      <p>
                          Filename: {filename}<br />
                          Decade: {decade}<br />
                          Copyright: {copyright}<br />
                          Info: {info}<br />
                          Title: {title}<br />
                      </p>
                      <button onClick={this.nextfunction.bind(this)}>Next Photo</button>
                  </div>

                  
              </div>
                )
          }
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);