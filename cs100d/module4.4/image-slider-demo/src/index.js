import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';


class Main extends React.Component {
  constructor() {
    super()
    this.state = {id: '0', addy: 'https://ibb.co/9G8WPmV', filename:'null.jpg', decade:'1950s', source:'Null Magazine', info:"null jello sculpture at 1950 World's Fair in Luxembourg", title:'Null Jello Sculpture', value: '', correct: 'null'}
    this.urlbase = 'http://127.0.0.1:5000'
  }

  createtable() {
    axios.get(this.urlbase + '/createtable').then((resp) => {
        alert(resp.data)
      })
        .catch(error => {
          console.log(error.response.data)
    })
  }
  
  check() {
    const {value, decade} = this.state
    var url = '/check'
    // Store the user's name in a JSON object
    const body = {'value': value, 'decade': decade}
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
    axios(config).then((resp) => {
      this.setState({...this.state, 
        correct: resp.data['correct'],
        
      })
    }).catch(error => {
      console.log(error.response.data)
    })
  }
  nextphoto() {
    const {id, addy, filename, decade, source, info, title} = this.state
    var url = '/nextphoto'
    // Store the user's name in a JSON object
    const body = {'id': id, 'addy':addy, 'filename': filename, 'decade': decade, 'source':source, 'info':info, 'title':title}
    // We're sending JSON data to our server
    const headers = { "Content-Type": "application/json" }
    // Configuration information for the server
    const config = {
        url: url,
        baseURL: this.urlbase,
        method: ['GET', 'POST'],
        headers: headers,
        data: body
    }
    axios(config).then((resp) => {
      this.setState({...this.state, 
        id:resp.data['id'],
        addy:resp.data['addy'],
        filename: resp.data['filename'],
        decade:resp.data['decade'],
        source:resp.data['source'],
        info:resp.data['info'],
        title:resp.data['title']
  
      })
    }).catch(error => {
      console.log(error.response.data)
    })
  }
  
  onDecadeChange(e) {
    //Keep track of the login value
    this.setState({...this.state, value: e.target.value})
  }
  
  onCorrectChange(e) {
    //Keep track of the login value
    this.setState({...this.state, correct: e.target.correct})
  }

  render() { 
    const {id, addy, filename, decade, source, info, title, value, correct} = this.state

    const addy_string = JSON.stringify(this.state.addy).trim('\n')


          
    return (
      <div>
                  <p>
                        id: {id} <br />
                        addy_string: {addy_string} <br />
                        correct: {correct}<br />
                        value:{value} <br />
                        filename:{filename} <br />
                        decade:{decade} <br />
                  </p>
        <img
          src={"https://i.ibb.co/R7vc8GB/nullurl.png"
          }
          alt="car"
          height="200"
        />
        <p><br /></p>
                      <button onClick={this.createtable.bind(this)}>Reset DB</button><br />
                      <button type="button" onClick={this.nextphoto.bind(this)}>Next Photo</button><br />
                      <span>decade: </span><input value={value} onChange={this.onDecadeChange.bind(this)}/> <br />
                      <button type="button" onClick={this.check.bind(this)}>Check</button>   
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);