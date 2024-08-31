import { useState } from 'react';
import './App.css'


export default function Main() {

  const [state, setState] = React.useState({
    filename: 'Untitled-1.jpg',
    decade:'1860s',
    title: 'Guess which decade the photo is from',
    rand:0, 
    id: 0, 
    source:'', 
    info:'', 
    count: '', 
    result: ''
  });

  const {filename, decade, title, count} = this.state
  console.log(filename)
  const address = (filename) => {
    return './popdecades/' + filename;
  }

  function create_table() {
    axios.get(this.urlbase + '/create_table').then((resp) => {
        alert(resp.data)
    })
  }

  function login() {
        const {filename, decade, title, userdecade, count} = this.state
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
            title: resp.data['title']
        })
    }).catch(error => {
        console.log(error)
    })
  }

  function arrow() {
    const {count} = this.state

    const counter = document.getElementById('counter');
    const incrementBtn = document.getElementById('increment');
    const decrementBtn = document.getElementById('decrement');
  /* 
  it doesn't like me changing the const count       
      incrementBtn.addEventListener('click', () => {
          count = count + 10;
          counter.textContent = count;
      });
      
      decrementBtn.addEventListener('click', () => {
          count = count - 10;
          counter.textContent = count;
      });
  */
    this.setState({...this.state, 
        userdecade: count

    }).catch(error => {
        console.log(error)
    })
  }

  function create_table() {
    axios.get(this.urlbase + '/create_table').then((resp) => {
        alert(resp.data)
    })
  }


  return (
    <div className='Main'>
        <div className = 'img'>
            <img src = {address(filename)} width="500" height="300"></img>
        </div>

        <div className = 'container'>
            <p>{title}</p>
            <button type="button" class = "lrgbutton" onClick={this.login.bind(this)}>New Photo</button>
        </div>

        <div className="container">
            <IncrementDecrementBtn minValue={1840} maxValue={2010} />
            <p>count:{count}</p>
        </div>

        <div className = 'container'>
            <SubmitBtn/>
        </div>
        
    </div>
  );
}