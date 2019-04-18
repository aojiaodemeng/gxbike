import React from 'react'
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import App from './App'
import Home from './pages/home'
import Admin from './admin'
import Login from './pages/login'
import Common from './common'
import UiButtons from './pages/ui/buttons.js'
import UiModals from './pages/ui/modals.js'
import UiLoading from './pages/ui/loading.js'
import UiNotification from './pages/ui/notice.js'
import UiMessages from './pages/ui/messages.js'
import UiTabs from './pages/ui/tabs.js'
import UiGallery from './pages/ui/gallery.js'
import UiCarousel from './pages/ui/carousel.js'
import FormLogin from './pages/form/login.js'
import FormRegister from './pages/form/register.js'
import TableBasic from './pages/table/basicTable.js'
import TableBasicMock from './pages/table/basicTableMock.js'
import TableBasicRadio from './pages/table/basicTableRadio.js'
import TableBasicCheckbox from './pages/table/basicTableCheckbox.js'
import TableBasicPaging from './pages/table/basicTablePaging.js'
import TableHigh from './pages/table/highTable.js'
import City from './pages/city'
import Order from './pages/order'
import OrderDetail from './pages/order/detail.js'
import User from './pages/user'
import BikeMap from './pages/map'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
import Rich from './pages/rich'
import Permission from './pages/permission'
import NoMatch from './pages/noMatch'
export default class IRouter extends React.Component{
    render(){
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/common" render={() => 
                            <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail}></Route>
                            </Common>
                        }></Route>
                        <Route path="/" render={() =>
                            <Admin>
                                <Switch>
                                    <Route path="/home" component={Home}></Route>
                                    <Route path="/ui/buttons" component={UiButtons}></Route>
                                    <Route path="/ui/modals" component={UiModals}></Route>
                                    <Route path="/ui/loadings" component={UiLoading}></Route>
                                    <Route path="/ui/notification" component={UiNotification}></Route>
                                    <Route path="/ui/messages" component={UiMessages}></Route>
                                    <Route path="/ui/tabs" component={UiTabs}></Route>
                                    <Route path="/ui/gallery" component={UiGallery}></Route>
                                    <Route path="/ui/carousel" component={UiCarousel}></Route>
                                    <Route path="/form/login" component={FormLogin}></Route>
                                    <Route path="/form/reg" component={FormRegister}></Route>
                                    <Route path="/table/basic1" component={TableBasic}></Route>
                                    <Route path="/table/basic2" component={TableBasicMock}></Route>
                                    <Route path="/table/basic3" component={TableBasicRadio}></Route>
                                    <Route path="/table/basic4" component={TableBasicCheckbox}></Route>
                                    <Route path="/table/basic5" component={TableBasicPaging}></Route>
                                    <Route path="/table/high" component={TableHigh}></Route>
                                    <Route path="/city" component={City}></Route>
                                    <Route path="/order" component={Order}></Route>
                                    <Route path="/user" component={User}></Route>
                                    <Route path="/bikeMap" component={BikeMap}></Route>
                                    <Route path="/charts/bar" component={Bar}></Route>
                                    <Route path="/charts/pie" component={Pie}></Route>
                                    <Route path="/charts/line" component={Line}></Route>
                                    <Route path="/rich" component={Rich} ></Route>
                                    <Route path="/permission" component={Permission}></Route>
                                    <Redirect to="/home" />
                                    // <Route component={NoMatch}/>
                                </Switch>
                            </Admin>
                        }></Route>
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}