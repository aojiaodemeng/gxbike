import React from 'react'
import {Row,Col} from 'antd'
import './index.less'
import Util from '../../utils/utils'
import Axios from '../../axios'
import { connect } from 'react-redux'
class Header extends React.Component{
    state={
        weather:'青砖多云'
    }
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
    // getWeatherAPIData(){
    //     let city='北京'
    //     let options={
    //         param:'Callback',
    //         timeout:2000
    //     }
    //     let url='https://free-api.heweather.net/s6/weather/now?location=beijing&key=HE1903131026581080'
    //     Axios.ajax({
    //         url:'https://free-api.heweather.net/s6/weather/now?location=beijing&key=HE1903131026581080',
    //         data:{
    //             params:{}
    //         }
    //     }).then((res)=>{
    //         console.log(res)
    //     })
    //     //注意要进行编码，encodeURIComponent(city)
    //     // Axios.jsonp({
    //     //     url:'https://free-api.heweather.net/s6/weather/now?location=beijing&key=HE1903131026581080'
    //     // }).then((res) => {
    //     //     if(res.status == 'ok'){
    //     //         let data = res.results[0].weather_data[0];
    //     //         this.setState({
    //     //             dayPictureUrl:data.dayPictureUrl,
    //     //             weather: data.weather
    //     //         })
    //     //     }
    //     // })
    //     // Axios.jsonp(url)
    // }
     getWeatherAPIData(){
        let city = '北京';
        Axios.jsonp({
            // url:'https://free-api.heweather.net/s6/weather/now?location=beijing&key=HE1903131026581080'
            // url:'http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
            url:'https://restapi.amap.com/v3/weather/weatherInfo?city='+encodeURIComponent(city)+'&output=json&key=463b61a9025bda2f8bd3ce4603d9b75c'
            // url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res)=>{
            this.setState({
                weather:res.weather
            })
        })
    }
    render(){
        const { menuName, menuType } = this.props;
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
                            <Col span={3} className="breadcrumb-title">
                                {menuName || '首页'}
                            </Col>
                            <Col span={21} className="weather">
                                <span className="date">{this.state.sysTime}</span>
                                <span className="weather-detail">
                                    {this.state.weather}
                                </span>
                            </Col>
                        </Row>
                    }
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        menuName: state.menuName
    }
};
export default connect(mapStateToProps)(Header)