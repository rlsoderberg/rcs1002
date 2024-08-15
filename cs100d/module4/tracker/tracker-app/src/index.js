import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';

class Main extends React.Component {
    constructor() {
        super()
        //Initial data has no user or counts
        this.state = {user: null, usercount: 0, totalcount: 0}
        this.urlbase = 'http://127.0.0.1:5000'
    }
    resetdb() {
        axios.get(this.urlbase + '/resetdb').then((resp) => {
            alert(resp.data)
        })
    }
    onLoginChange(e) {
        //Keep track of the login value
        this.setState({...this.state, user: e.target.value})
    }
    login() {
        
    }
    render() {
        const {user, usercount, totalcount} = this.state
        return (
            <div className='Main'>
                <button onClick={this.resetdb.bind(this)}>Reset Database</button>
                <p>
                    <span>login: </span><input value={user} onChange={this.onLoginChange.bind(this)}/>
                    <button onClick={this.login.bind(this)}>Login</button>
                </p>
                {(usercount > 0) && 
                <div>
                    <p><span>{user} count: {usercount}</span></p>
                    <p><span>total count: {totalcount}</span></p>
                </div>
                }
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);