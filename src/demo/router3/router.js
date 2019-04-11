import React from 'react'
import {HashRouter as Router,Route,Link,Switch} from 'react-router-dom'
import Home from './Home'
import About from './../router2/About'
import Topic from './../router2/Topic'
import Main from './Main'
import Info from './Info'
import NoMatch from './NoMatch'
export default class IRouter extends React.Component{


    render(){
        return (
            <Router>
                <Home>
                    <Route path="/main" render={()=>
                        <Main>
                            <Route path="/main/:value" component={Info}></Route>
                        </Main>
                    }></Route>
                    <Route path="/about" component={About}></Route>
                    <Route exact={true} path="/about/abc" component={About}></Route>
                    <Route path="/topic" component={Topic}></Route>
                    <Route component={NoMatch}></Route>
                </Home>
            </Router>
        );
    }
}