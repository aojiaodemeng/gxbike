import React from 'react';
import { Card, Table, Modal, Button, message} from 'antd';

export default class BasicTable extends React.Component{
    state={}
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
        this.setState({
            dataSource
        })
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
        }, {
          title: '状态',
          dataIndex: 'state',
        }, {
          title: '爱好',
          dataIndex: 'interest',
        }, {
          title: '生日',
          dataIndex: 'birthday',
        }, {
          title: '地址',
          dataIndex: 'address',
        }];
        return(
            <div>
                <Card title="基础表格">
                    <Table 
                        dataSource={this.state.dataSource} 
                        columns={columns} 
                        bordered
                        pagination={true}
                    />
                </Card>
            </div>
        );
    }
}