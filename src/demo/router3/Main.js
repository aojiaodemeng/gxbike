import React from 'react'
import {Link} from 'react-router-dom'
export default class Main extends React.Component{
    render(){
        return (
            <div>
                this is mian page
                <br/>
                <Link to="/main/test-id">嵌套路由id</Link>
                <br/>
                <Link to="/main/456">普通嵌套路由</Link>
                <br/>
                {this.props.children}
            </div>
        )
    }
}