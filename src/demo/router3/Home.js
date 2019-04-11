import React from 'react'
import {Link} from 'react-router-dom'

export default class Home extends React.Component{
    render(){
        return(
            <div>
                <Link to="/main">main</Link>
                <br/>
                <Link to="/about">about</Link>
                <br/>
                <Link to="/topic">topic</Link>
                <br/>
                <Link to="/test1">test1</Link>
                <br/>
                <Link to="/test2">test2</Link>
                <hr/>
                {this.props.children}
            </div>
        )
    }
}
