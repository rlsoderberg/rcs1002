import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button, ButtonType } from './button';
import { Display } from './display'
import './calc.css';

class Main extends React.Component {
    constructor () {
        super()
        this.state = {display: '0', leftnum: 0, op: ''}
    }

    numberClick(btnNumber) {
        const { display } = this.state
        const val = btnNumber
        var newdisplay
        var intofdisplay = parseInt(display)
        if (display === '0' || isNaN(intofdisplay))
            newdisplay = val
        else
            newdisplay = display + val
        this.setState({...this.state, display: newdisplay})
    }

    ceClick(event) {
        this.setState({...this.state, display: 0, leftnum: 0, op: ''})
    }

    opClick(btnOp) {
        const { display } = this.state
        const leftnum = parseInt(display)
        const newdisplay = btnOp
        this.setState({...this.state, display: newdisplay, leftnum: leftnum, op:btnOp})
    }
    eqClick(event) {
        const {display, leftnum, op} = this.state
        if (op !== '') {
            const rightnum = parseInt(display)
            var res = 0
            if (op === '+')
                res = leftnum + rightnum
            else if (op === '-')
                res = leftnum - rightnum
            else if (op === '*')
                res = leftnum * rightnum
            else if (op === '/')
                res = leftnum / rightnum

            this.setState({...this.state, display:res.toString(), leftnum: 0, op: ''})
        }
    }

    render() {
        const { display } = this.state
        const numberClick = this.numberClick.bind(this)
        const ceClick = this.ceClick.bind(this)
        const opClick = this.opClick.bind(this)
        const eqClick = this.eqClick.bind(this)

        return (
            <div className='main'>
                <img className='logo' src="https://d2o2figo6ddd0g.cloudfront.net/6/w/31cxsxy4no5n2j/Flagonly.jpg" alt="Whitworth University"/>
                <h1 style={{"textAlign":"center"}}>π-rates Calculator</h1>
                <table className='calc'>
                    <tbody>
                    <tr className='calc'>
                        <td colSpan="5"><Display display={display}/></td>
                    </tr>
                    <tr>
                        <td><Button type = {ButtonType.Number} display="7" onclick={numberClick}/></td>   
                        <td><Button type = {ButtonType.Number} display="8" onclick={numberClick}/></td> 
                        <td><Button type = {ButtonType.Number} display="9" onclick={numberClick}/></td>   
                        <td><Button type = {ButtonType.Op} display="/" onclick={opClick}/></td>   
                        <td><Button type = {ButtonType.Op} display="?" onclick={opClick}/></td>  
                    </tr>
                    <tr>
                        <td><Button type = {ButtonType.Number} display="4" onclick={numberClick}/></td>   
                        <td><Button type = {ButtonType.Number} display="5" onclick={numberClick}/></td> 
                        <td><Button type = {ButtonType.Number} display="6" onclick={numberClick}/></td>   
                        <td><Button type = {ButtonType.Op} display="*" onclick={opClick}/></td>  
                        <td><Button type = {ButtonType.Op} display="?" onclick={opClick}/></td>  
                    </tr>
                    <tr>
                        <td><Button type = {ButtonType.Number} display="1" onclick={numberClick}/></td>   
                        <td><Button type = {ButtonType.Number} display="2" onclick={numberClick}/></td> 
                        <td><Button type = {ButtonType.Number} display="3" onclick={numberClick}/></td>   
                        <td><Button type = {ButtonType.Op} display="-" onclick={opClick}/></td>  
                        <td><Button type = {ButtonType.Op} display="?" onclick={opClick}/></td>  
                    </tr>
                    <tr>
                        <td><Button type = {ButtonType.Number} display="0" onclick={numberClick}/></td>   
                        <td><Button type = {ButtonType.Op} display="CE" onclick={ceClick}/></td>  
                        <td><Button type = {ButtonType.Op} display="=" onclick={eqClick}/></td>  
                        <td><Button type = {ButtonType.Op} display="?" onclick={opClick}/></td>  
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);