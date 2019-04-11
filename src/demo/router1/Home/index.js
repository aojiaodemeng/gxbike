import React from 'react'
import {HashRouter,Route,Link,Switch} from 'react-router-dom'
import Topic from './../Topic'
import About from './../About'
export default class Home extends React.Component{
    render(){
        return (
            <HashRouter>
                <div>
                    这是home页面(多路由加载)
                    <hr/>
                    <Link to="/topic">点击我，对应的Route地方会返回Topic组件内容</Link>
                    <br/>
                    <Link to="/about">点击我，对应的Route地方会返回About组件内容</Link>
                    <Switch>
                        <Route path="/topic" component={Topic}></Route>
                        <Route path="/about" component={About}></Route>
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}