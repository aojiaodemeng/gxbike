import React from 'react'
import {HashRouter,Route,Switch} from 'react-router-dom'
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
import OrderDetail from './pages/order/detail'
import NoMatch from './pages/noMatch'
export default class IRouter extends React.Component{
    render(){
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/admin" render={() =>
                        <Admin>
                            <Switch>
                                <Route path="/admin/home" component={Home}></Route>
                                <Route path="/admin/ui/buttons" component={UiButtons}></Route>
                                <Route path="/admin/ui/modals" component={UiModals}></Route>
                                <Route path="/admin/ui/loadings" component={UiLoading}></Route>
                                <Route path="/admin/ui/notification" component={UiNotification}></Route>
                                <Route path="/admin/ui/messages" component={UiMessages}></Route>
                                <Route path="/admin/ui/tabs" component={UiTabs}></Route>
                                <Route path="/admin/ui/gallery" component={UiGallery}></Route>
                                <Route path="/admin/ui/carousel" component={UiCarousel}></Route>
                                <Route path="/admin/form/login" component={FormLogin}></Route>
                                <Route path="/admin/form/reg" component={FormRegister}></Route>
                                <Route path="/admin/table/basic1" component={TableBasic}></Route>
                                <Route path="/admin/table/basic2" component={TableBasicMock}></Route>
                                <Route path="/admin/table/basic3" component={TableBasicRadio}></Route>
                                <Route path="/admin/table/basic4" component={TableBasicCheckbox}></Route>
                                <Route path="/admin/table/basic5" component={TableBasicPaging}></Route>
                                <Route path="/admin/table/high" component={TableHigh}></Route>
                                <Route path="/admin/city" component={City}></Route>
                                <Route path="/admin/order" component={Order}></Route>
                                <Route component={NoMatch}/>
                            </Switch>
                        </Admin>
                    }></Route>
                    <Route path="/common" render={() => 
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={OrderDetail}></Route>
                        </Common>
                    }></Route>
                </App>
            </HashRouter>
        )
    }
}
