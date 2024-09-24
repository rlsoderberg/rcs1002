import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import nextphoto from './server.py';
import axios from 'axios';

class Main extends React.Component {
  constructor() {
    super()
    //Initial data has no user or counts
    this.state = {filename: 'elves.jpg', decade: '1910s', copyright: 'Santa Corp', info: 'Elves quarterly secret meeting, 1912', title: 'Elves Secret Meeting'}
    this.urlbase = 'http://127.0.0.1:5000'
}
  getnext() {
    console.log('nexted')
    axios.get(this.urlbase + '/nextphoto').then((resp) => {
        alert(resp.data)
    })
  }
  resetdb() {
    axios.get(this.urlbase + '/resetdb').then((resp) => {
        alert(resp.data)
    })
}
  /*
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
          method: 'GET',
          headers: headers,
          data: body
      }
    }
      */
  
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
                      <button onClick={this.resetdb.bind(this)}>Next Photo</button>
                  </div>                  
              </div>
                )
              }
  }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);