import React from 'react'
import {Row,Col} from 'antd'
import './index.less'
import Util from '../../utils/utils'
import Axios from '../../axios'
export default class Header extends React.Component{
    state={}
    componentWillMount() {
        this.setState({
            userName: '傲娇的萌、'
        })
        setInterval(() => {
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000)
        this.getWeatherAPIData();
    }
    getWeatherAPIData(){
        let city='北京'
        //注意要进行编码，encodeURIComponent(city)
        console.log("下面开始jsonp请求");
        Axios.jsonp({
            url:'https://free-api.heweather.net/s6/weather/now?location=beijing&key=HE1903131026581080'
        }).then((res) => {
            // console.log("6",res);
            // if(res.status == 'ok'){
            //     let data = res.results[0].weather_data[0];
            //     this.setState({
            //         dayPictureUrl:data.dayPictureUrl,
            //         weather: data.weather
            //     })
            // }
        })
    }

    render(){
        const menuType = this.props.menuType;
        return (
            <div className="header">
                <Row className="header-top">
                    {
                        menuType ? 
                         <Col span={6} className="logo">
                            <img src="/assets/logo-ant.svg" alt=""/>
                            <span>我的管理系统</span>
                        </Col>  : ''
                    }
                    <Col span={ menuType ? 18 : 24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {
                    menuType ? '':
                        <Row className="breadcrumb">
                            <Col span={4} className="breadcrumb-title">
                                首页
                            </Col>
                            <Col span={20} className="weather">
                                <span className="date">{this.state.sysTime}</span>
                                <span className="weather-detail">
                                    {/*晴转多云*/}
                                    <img src={this.state.dayPictureUrl} alt="" />
                                    {this.state.weather}
                                </span>
                            </Col>
                        </Row>
                    }
            </div>
        )
    }
}