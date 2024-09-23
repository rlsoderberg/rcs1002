import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
/*
from fetch_data import result_row

(filename, decade, copyright, info, title) = result_row
img_path = fr"cs100d\module4\app_prototype\popdecades\{filename}"
*/

class Main extends React.Component {
    constructor() {
        super()
        //Initial data has no user or counts
        this.state = {filename: null, decade: null, copyright: null, info: null, title: null}
        this.urlbase = 'http://127.0.0.1:5000'
    }
    /*
    resetdb() {
        axios.get(this.urlbase + '/resetdb').then((resp) => {
            alert(resp.data)
        })
    }
]   
    onLoginChange(e) {
        //Keep track of the login value
        this.setState({...this.state, user: e.target.value})
    }
    login() {
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
        // Make the request
        axios(config).then((resp) => {
            //When this completes, the response from the server has the count data
            this.setState({...this.state, 
                usercount: resp.data['user count'], // How many logins for this user?
                totalcount: resp.data['total count'] //How many total logins?
            })
        }).catch(error => {
            console.log(error)
        })
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
                </div>

                
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);