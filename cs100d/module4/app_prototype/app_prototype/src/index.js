import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';
import {IncrementDecrementBtn} from "./IncrementDecrementBtn";
import {count} from "./IncrementDecrementBtn";
import {SubmitBtn} from "./Submit";

class Main extends React.Component {
    constructor() {
        super()
        //Initial data has no user or counts
        this.urlbase = 'http://localhost:5000'
        this.state = {rand:0, id: 0, filename:'', decade:'', source:'', info:'', title:'', userdecade:''}
        this.state = {filename: 'Untitled-1.jpg', decade: '1860s', title: 'Guess which decade the photo is from'}
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
            const {filename, decade, title, userdecade} = this.state
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

    arrow() {
        const {userdecade} = this.state

        let count = 0;

        const counter = document.getElementById('counter');
        const incrementBtn = document.getElementById('increment');
        const decrementBtn = document.getElementById('decrement');
        
        incrementBtn.addEventListener('click', () => {
            count = count + 10;
            counter.textContent = count;
        });
        
        decrementBtn.addEventListener('click', () => {
            count = count - 10;
            counter.textContent = count;
        });

        this.setState({...this.state, 
            userdecade: count

        }).catch(error => {
            console.log(error)
        })
    }

    create_table() {
        axios.get(this.urlbase + '/create_table').then((resp) => {
            alert(resp.data)
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

                <div className = 'container'>
                    <p>{title}</p>
                    <button type="button" class = "lrgbutton" onClick={this.login.bind(this)}>New Photo</button>
                </div>

                <div className="container">
                    <IncrementDecrementBtn minValue={1840} maxValue={2010} />
                </div>

                <div className = 'container'>
                    <SubmitBtn userCount = {count} onClick={check}/>
                </div>
                
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);