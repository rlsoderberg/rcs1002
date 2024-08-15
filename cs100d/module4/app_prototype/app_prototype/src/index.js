import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';

class Main extends React.Component {
    constructor() {
        super()
        //Initial data has no user or counts
        this.urlbase = 'http://localhost:5000'
        //this.state = {rand:0, id: 0, filename:'', decade:'', source:'', info:'', title:''}
        this.state = {filename: 'dg_logo.png', decade: '1860s', title: 'Guess which decade the photo is from (1840s to 2010s)'}
    }

    onLoginChange(e) {
        //Keep track of the login value
        this.setState({...this.state, filename: e.target.value}) 
    }   
    
    create_table() {
        axios.get(this.urlbase + '/create_table').then((resp) => {
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
                title: resp.data['title']
            })
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        const {filename, decade, title} = this.state
        console.log(filename)
        const address = (filename) => {
            return './popdecades/' + filename;
          }
        return (
            <div className='Main'>
                <div className = 'img'>
                    <img src = {address(filename)} width="500" height="300"></img>
                </div>

                <div className = 'desc'>
                    <p>filename: {filename}</p>
                    <p>title: {title}</p>
                    <p>address: {address(filename)}</p>
                    <button type="button" onClick={this.login.bind(this)}>New Photo</button>
                </div>

                
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);