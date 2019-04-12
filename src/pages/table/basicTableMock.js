import React from 'react';
import { Card, Table, Modal, Button, message} from 'antd';
// import axios from 'axios'
import axios from './../../axios/index.js'
export default class BasicTable extends React.Component{
    state={
        dataSource:[]
    }
    // 动态获取mock数据
    request = () =>{
        // 不使用封装好的axios
        // let baseUrl='https://easy-mock.com/mock/5caeedf7085b936cbae82c66/gxbikeapi'
        // axios.get(baseUrl+'/table/list')
        //      .then((res) => {
        //         if(res.status == '200' && res.data.code == 0){
        //             this.setState({
        //                 dataSource:res.data.result
        //             })
        //         }
        //      })

        // 使用封装好的axios
        axios.ajax({
            url:'/table/list',
            data:{
                params:{
                    page:1
                },
                isShowLoading:true
            }
        }).then((res) => {
            if(res.code == '0'){
                this.setState({
                    dataSource:res.result.list
                })
            }
        })
    }
    componentDidMount(){
        this.request();
    }
    render(){
        const columns = [{
          title: 'id',
          dataIndex: 'id',
        }, {
          title: '用户名',
          dataIndex: 'userName',
        }, {
          title: '性别',
          dataIndex: 'sex',
          render(a){
            return a == 1 ? '男' : '女';
          }
        }, {
          title: '状态',
          dataIndex: 'state',
          render(a){
            let config = {
                '1':'咸鱼一条',
                '2':'风华浪子',
                '3':'交大才子',
                '4':'百度FE',
                '5':'创业者'
            }
            return config[a];
          }
        }, {
          title: '爱好',
          dataIndex: 'interest',
          render(a){
            let config = {
                '1':'游泳',
                '2':'爬山',
                '3':'追剧',
                '4':'篮球',
                '5':'跑步',
                '6':'王者荣耀',
                '7':'撩妹',
                '8':'cosplay'
            }
            return config[a];
          }
        }, {
          title: '生日',
          dataIndex: 'birthday',
        }, {
          title: '地址',
          dataIndex: 'address',
        }];
        return(
            <div>
                <Card title="动态数据渲染表格" style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                    />
                </Card>
            </div>
        );
    }
}