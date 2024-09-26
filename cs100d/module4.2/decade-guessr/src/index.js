import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import nextphoto from './server.py';
import axios from 'axios';

class Main extends React.Component {
  constructor() {
    super()
    //Initial data has no user or counts
    this.state = {filename: 'dglogo.jpg', decade: '1860s', copyright: null, info: null, title: 'Guess which decade the photo is from (1840s to 2010s)'}
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
    // Make the request
  axios(config).then((resp) => {
    //When this completes, the response from the server has the count data
    this.setState({...this.state, 
        filename: resp.data['filename'], // How many logins for this user?
        decade: resp.data['decade'],
        source: resp.data['source'],
        info: resp.data['info'],
        title: resp.data['title']
    })
  }).catch(error => {
    console.log(error)
  })
  }
  
      render() {
        const address = (filename) => {
            return './photos/' + filename;
          }
          const {filename, decade, source, info, title} = this.state
          return (
              <div className='Main'>
                  <div className = 'img'>
                    <img src = {address(filename)} width="500" height="300" alt="decadeGuessr Photo"></img>
                </div>

                  <div className = 'desc'>
                      <p>
                          Filename: {filename}<br />
                          Decade: {decade}<br />
                          Source: {source}<br />
                          Info: {info}<br />
                          Title: {title}<br />
                          Address: {address(filename)}<br />

                      </p>
                      <button onClick={this.resetdb.bind(this)}>Reset DB</button>
                      <button type="button" onClick={this.login.bind(this)}>New Photo</button>
                  </div>                  
              </div>
                )
              }
  }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);