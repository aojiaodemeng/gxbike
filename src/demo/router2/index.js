import React from 'react'
import {HashRouter as Router,Route,Link} from 'react-router-dom'
import Home from './Home'
import About from './About'
import Topic from './Topic'
import Main from './Main'
export default class IRouter extends React.Component{


    render(){
        return (
            <Router>
                <Home>
                    <Route path="/main" render={()=>
                        <Main>
                            <Route path="/main/a" component={About}></Route>
                        </Main>
                    }></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/topic" component={Topic}></Route>
                </Home>
            </Router>
        );
    }
}