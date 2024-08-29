import { useState } from 'react'
import './App.css'

function Main() {
  /*
  const [filename, setFilename] = React.useState('Untitled-1.jpg')
  const [decade, setDecade] = React.useState('1860s')
  const [title, setTitle] = React.useState('Guess which decade the photo is from')
  */
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
})
  /*
    constructor() {
        super()
        //Initial data has no user or counts
        this.urlbase = 'http://localhost:5000'
        this.state = {rand:0, id: 0, filename:'', decade:'', source:'', info:'', title:'', count: '', result: ''}
        this.state = {filename: 'Untitled-1.jpg', decade: '1860s', title: 'Guess which decade the photo is from'}
    }
  */

    onLoginChange() {
        //Keep track of the login value
        this.setFilename({e.target.value}) 
    }   
    
    create_table() {
        axios.get(this.urlbase + '/create_table').then((resp) => {
            alert(resp.data)
        })
    }

    login() {
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

    arrow() {
        const {count} = this.state

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
        const {filename, decade, title, count} = this.state
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
                    <p>count:{count}</p>
                </div>

                <div className = 'container'>
                    <SubmitBtn/>
                </div>
                
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);