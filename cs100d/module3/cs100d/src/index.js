
import React from 'react';

import ReactDOM from 'react-dom/client';

import './index.css';



class Main extends React.Component {
    constructor() {
      super()

      this.state = {'count':0}
    }

    increaseCount(){
      const {count} = this.state
      this.setState({...this.state, count: count+1})
    }

    decreaseCount(){
      const {count} = this.state
      this.setState({...this.state, count: count-1})
    }

    render() {
        const { user, lastname } = this.props
        const { count } = this.state
        return (
            <div className='Main'>
                <p>Hello {user} {lastname}</p>
                <p>{count} clicks</p>

                <button onClick = {this.increaseCount.bind(this)}>Count</button>

                <button onClick = {this.decreaseCount.bind(this)}>Uncount</button>
            </div>
        )
    }
}



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Main user='Pete' />);