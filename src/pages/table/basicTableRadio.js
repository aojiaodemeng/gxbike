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
                res.result.list.map((item,index)=>{
                  item.key = index
                })
                this.setState({
                    dataSource:res.result.list
                })
            }
        })
    }
    onRowClick = (record,index) => {
      // 测试
      // Modal.info({
      //   title:'信息',
      //   content:`用户名：${record.userName},用户爱好：${record.interest}`
      // })
      let selectKey = [index];
      this.setState({
        selectedRowKeys: selectKey,
        selectedItem: record
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
        const {selectedRowKeys} = this.state;
        const rowSelection = {
          type:'radio',
          selectedRowKeys
        }
        return(
            <div>
                <Card title="表格嵌套单选按钮" style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        rowSelection = {rowSelection}
                        onRow={(record,index) => {
                          return {
                            onClick: () => {
                              this.onRowClick(record,index);
                            },  
                          };
                        }}
                    />
                </Card>
            </div>
        );
    }
}