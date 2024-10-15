import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';
import NumberPicker from "react-widgets/NumberPicker";

class Main extends React.Component {
  constructor() {
    super()
    this.state = {value:'0', id:'0', filename:'null.jpg', decade:'1950s', source:'Null Magazine', info:"null jello sculpture at 1950 World's Fair in Luxembourg", title:'Null Jello Sculpture'}
    this.urlbase = 'http://127.0.0.1:5000'
}
createtable() {
  axios.get(this.urlbase + '/createtable').then((resp) => {
      alert(resp.data)
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
  //i don't get any of these consts up here! i tried deleting them, but apparently you HAVE to define config! i mean... it is used in this axios thing
  //what i don't get, is the difference between this and resetdb! 

  axios(config).then((resp) => {
    /*
    this.setState({...this.state, 
      value: resp.data['value'],
      id: resp.data['id'],
      filename: resp.data['filename'],
      decade: resp.data['decade'],
      source: resp.data['source'],
      info: resp.data['info'],
      title: resp.data['title']
    })
      */
    this.setState({...this.state, 
      filename: resp.data['filename']
    })
  }).catch(error => {
    console.log(error.response.data)
  })
  console.log(filename)
  /*
  axios.get(this.urlbase + '/nextphoto')
  .then((resp) => {
      alert(resp.data)})
  */

    /*axios(config).then((resp) => {
  this.setState({...this.state, 
      filename: resp.data['filename']
  })
}).catch(error => {
  console.log(error.response.data)
})
console.log(filename)
*/
}
onLoginChange(e) {
  //Keep track of the login value
  this.setState({...this.state, value: e.target.value})
}

/*my comments in render never seem to work!!! here is my cool number picker
<NumberPicker defaultValue={1950}
value={count}
onChange={count => setCount(count)}
/>
*/

  
      render() { 
        
          const {value, id, filename, decade, source, info, title} = this.state
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
                      </p>
                      <button onClick={this.createtable.bind(this)}>Reset DB</button>
                      <button type="button" onClick={this.nextphoto.bind(this)}>New Photo</button>
                      <span>year: </span><input value={value} onChange={this.onLoginChange.bind(this)}/>                     
                  </div>                  
              </div>
                )
              }
  }


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);