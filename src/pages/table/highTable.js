import React from 'react';
import { Card, Table, Modal, Button, message, Badge } from 'antd';
import axios from './../../axios/index'
import Utils from './../../utils/utils';
export default class BasicTable extends React.Component {
    state={}
    params = {
      page:1
    }
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
        let _this = this;
        axios.ajax({
            url:'/table/list',
            data:{
                params:{
                    page:this.params.page
                },
                isShowLoading:true
            }
        }).then((res) => {
            if(res.code == '0'){
                res.result.list.map((item,index)=>{
                  item.key = index
                })
                this.setState({
                    dataSource:res.result.list
                })
            }
        })
    }
    componentDidMount(){
      const dataSource = [
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-09-09',
                address:'上海市浦东新区',
                time:'09:00'
            },
            {
                id:'1',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-09-09',
                address:'上海市浦东新区',
                time:'09:00'
            },
            {
                id:'2',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-09-09',
                address:'上海市浦东新区',
                time:'09:00'
            },
        ]
        // 如果页面报错说没有key值，可以用以下方法动态添加key值
        dataSource.map((item,index)=>{
          item.key = index;
        })
        this.request();
    }
    handleChange=(pagination,filters,sorter)=>{
        // console.log(sorter);
        this.setState({
            sortOrder:sorter.order
        })
    }
    handleDelete=(item)=>{
        let id = item.id;
        Modal.confirm({
            title:'删除提示',
            content:'确定删除数据吗?',
            onOk:()=>{
                message.success('删除成功');
                this.request();
            }
        })
    }
    render(){
        const columns1 = [{
          title: 'id',
          dataIndex: 'id',
          width:80
        }, {
          title: '用户名',
          dataIndex: 'userName',
          width:80
        }, {
          title: '性别',
          dataIndex: 'sex',
          width:80,
          render(a){
            return a == 1 ? '男' : '女';
          }
        }, {
          title: '状态',
          dataIndex: 'state',
          width:180,
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
          width:120,
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
          width:190
        }, {
          title: '地址',
          dataIndex: 'address',
          width: 190
        }];

        const columns2 = [{
          title: 'id',
          dataIndex: 'id',
          width:80,
          fixed:'left'
        }, {
          title: '用户名',
          dataIndex: 'userName',
          width:80
        }, {
          title: '性别',
          dataIndex: 'sex',
          width:80,
          render(a){
            return a == 1 ? '男' : '女';
          }
        }, {
          title: '状态',
          dataIndex: 'state',
          width:180,
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
          width:120,
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
          width:190
        }, {
          title: '地址',
          dataIndex: 'address'
        }];

        const columns3 = [{
          title: 'id',
          dataIndex: 'id',
          width:80,
          fixed:'left'
        }, {
          title: '用户名',
          dataIndex: 'userName',
          width:80
        }, {
          title: '性别',
          dataIndex: 'sex',
          width:80,
          render(a){
            return a == 1 ? '男' : '女';
          }
        }, {
            title:'年龄',
            dataIndex:'age',
            width:80,
            sorter:(a,b)=>{
                return a.age - b.age;
            },
            sortOrder:this.state.sortOrder
        }, {
          title: '状态',
          dataIndex: 'state',
          width:180,
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
          width:120,
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
          width:190
        }, {
          title: '地址',
          dataIndex: 'address'
        }];

        const columns4 = [{
          title: 'id',
          dataIndex: 'id',
          width:80,
          fixed:'left'
        }, {
          title: '用户名',
          dataIndex: 'userName',
          width:80
        }, {
          title: '性别',
          dataIndex: 'sex',
          width:80,
          render(a){
            return a == 1 ? '男' : '女';
          }
        }, {
            title:'年龄',
            dataIndex:'age',
            width:80,
            sorter:(a,b)=>{
                return a.age - b.age;
            },
            sortOrder:this.state.sortOrder
        }, {
          title: '状态',
          dataIndex: 'state',
          width:180,
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
          width:120,
          dataIndex: 'interest',
          render(a){
            let config = {
                // '1':'游泳',
                // '2':'爬山',
                // '3':'追剧',
                // '4':'篮球',
                // '5':'跑步',
                // '6':'王者荣耀',
                // '7':'撩妹',
                // '8':'cosplay'
                '1':<Badge status="success" text="游泳"/>,
                '2':<Badge status="error" text="爬山"/>,
                '3':<Badge status="default" text="追剧"/>,
                '4':<Badge status="processing" text="篮球"/>,
                '5':<Badge status="warning" text="跑步"/>,
                '6':<Badge status="success" text="王者荣耀"/>,
                '7':<Badge status="success" text="撩妹"/>,
                '8':<Badge status="success" text="cosplay"/>,
            }
            return config[a];
          }
        }, {
          title: '操作',
          dataIndex: 'birthday',
          width:190,
          render:(text,item)=>{
            return <Button size="small" href="#" onClick={(item)=>{this.handleDelete(item)}}>删除</Button>
          }
        }, {
          title: '地址',
          dataIndex: 'address'
        }];
        return (
            <div>
                <Card title="头部固定">
                    <Table
                        bordered
                        columns={columns1}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{y:240}}
                    />
                </Card>
                <Card title="左侧固定" style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{x:1900,y:300}}
                    />
                </Card>
                 <Card title="表格排序" style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        columns={columns3}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{x:1900,y:300}}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="操作按钮" style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        columns={columns4}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{x:1900,y:300}}
                    />
                </Card>
            </div>
        )
    }
}