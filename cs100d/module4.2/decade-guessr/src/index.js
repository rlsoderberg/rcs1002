import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';
import NumberPicker from "react-widgets/NumberPicker";

class Main extends React.Component {
  constructor() {
    super()
    this.state = {correct: 'null', value:'0', id:'0', filename:'null.jpg', decade:'1950s', source:'Null Magazine', info:"null jello sculpture at 1950 World's Fair in Luxembourg", title:'Null Jello Sculpture'}
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
displaydecade() {
  axios.get(this.urlbase + '/check').then((resp) => {
      alert(resp.data)
    })
      .catch(error => {
        console.log(error.response.data)
  })
}
/*
postcorrect() {
  axios.post(this.urlbase + '/check', {correct})
  .then((resp) => {alert(resp.data)
    })
      .catch(error => {
        console.log(error.response.data)
  })
}

axios.post("api/users/login", { email, password, },config)
  .then(res=>res.data)
  .then(data=> {
    console.log(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    setLoading(false);
  })
  .catch(error => {
    setError(error)
  })
    */
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
      filename: resp.data['filename']
    })
  }).catch(error => {
    console.log(error.response.data)
  })
}
nextcorrect() {
  const {correct} = this.state
  var url = '/nextcorrect'
  // Store the user's name in a JSON object
  const body = {'correct': correct}
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
      correct: resp.data['correct']
    })
  }).catch(error => {
    console.log(error.response.data)
  })
}
check() {
  const {decade, value} = this.state
  var url = '/poster'
  // Store the user's name in a JSON object
  const body = {'decade': decade, 'value': value}
  // We're sending JSON data to our server
  const headers = { "Content-Type": "application/json" }
  // Configuration information for the server
  const config = {
      url: url,
      baseURL: this.urlbase,
      method: ['POST'],
      headers: headers,
      data: body
  }
  axios(config).then((resp) => {
    this.setState({...this.state, 
      correct: resp.data['correct']
    })
  }).catch(error => {
    console.log(error.response.data)
  })
}
onYearChange(e) {
  //Keep track of the login value
  this.setState({...this.state, value: e.target.value})
}

onCorrectChange(e) {
  //Keep track of the login value
  this.setState({...this.state, correct: e.target.correct})
}

/*my comments in render never seem to work!!! here is my cool number picker
<NumberPicker defaultValue={1950}
value={count}
onChange={count => setCount(count)}
/>
*/

  
      render() { 
        
          const {correct, value, id, filename, year, source, info, title} = this.state
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
                          Address: {address(filename)} <br />
                          Value: {value}
                          Correct: {correct}
                      </p>
                      <button onClick={this.createtable.bind(this)}>Reset DB</button><br />
                      <button type="button" onClick={this.nextphoto.bind(this)}>New Photo</button><br />
                      <button type="button" onClick={this.displaydecade.bind(this)}>displaydecade</button><br />
                      <span>year: </span><input value={value} onChange={this.onYearChange.bind(this)}/> <br />
                      <button type="button" onClick={this.nextcorrect.bind(this)}>Check</button>     
                                        
                  </div>                  
              </div>
                )
              }
  }


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);