import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';
import NumberPicker from "react-widgets/NumberPicker";

class Main extends React.Component {
  constructor() {
    super()
    this.state = {img_src: './photos/null.jpg', send: 'null', correct: 'null', value:'0', id:'0', filename:'null.jpg', decade:'1950s', source:'Null Magazine', info:"null jello sculpture at 1950 World's Fair in Luxembourg", title:'Null Jello Sculpture'}
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
  const {filename} = this.state
  var url = '/nextphoto'
  // Store the user's name in a JSON object
  const body = {'filename': filename}
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
  axios(config).then((resp) => {
    this.setState({...this.state, 
      filename: resp.data['filename'],

      value:resp.data['value'],
      id:resp.data['id'],
      filename:resp.data['filename'],
      decade:resp.data['decade'],
      source:resp.data['source'],
      info:resp.data['info'],
      title:resp.data['title']
    })
  }).catch(error => {
    console.log(error.response.data)
  })
}

display_img() {
  const {img_src} = this.state
  var url = '/photo'
  // Store the user's name in a JSON object
  const body = {'img_src': img_src}
  // We're sending JSON data to our server
  const headers = { "Content-Type": "image/png" }
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
      filename: resp.data['img_src'],
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
        const {correct, value, id, filename, decade, source, info, title} = this.state

        const img_loc = {
          string: '/photos/' + {filename} 
        }
      
          return (
              <div className='Main'>
                  <div className = 'img'>
                    <img src = {img_loc} width="500" height="300" alt="decadeGuessr Photo"></img>
                  </div>

                  <div className = 'desc'>
                      <p>
                        img_loc: {JSON.stringify(img_loc.string)} <br />
                        correct: {correct}<br />
                        value:{value} <br />
                        filename:{filename} <br />
                        decade:{decade} <br />
                      </p>
                      <button onClick={this.createtable.bind(this)}>Reset DB</button><br />
                      <button type="button" onClick={this.nextphoto.bind(this)}>Next Photo</button><br />
                      <span>decade: </span><input value={value} onChange={this.onDecadeChange.bind(this)}/> <br />
                      <button type="button" onClick={this.check.bind(this)}>Check</button>
                      <button type="button" onClick={this.display_img.bind(this)}>Display Photo</button>
                                        
                  </div>                  
              </div>
                )
              }
  }


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);