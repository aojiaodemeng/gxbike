import React from 'react'
import { Card, Button, Table, Form, Select, Modal, message,DatePicker } from 'antd'
import axios from './../../axios'
import Utils from './../../utils/utils'
import BaseForm from './../../components/BaseForm'
const FormItem = Form.Item;
const Option = Select.Option;

export default class Order extends React.Component{
	state = {
		dataSource:[]
	}
	params = {
		page: 1
	}

    // 这是是为了使用封装的baseForm-代码开始
    formList = [
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            placeholder:'全部',
            initialValue:'1',
            width:100,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field:'order_status',
            placeholder: '全部',
            initialValue: '1',
            width: 120,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        }
    ]
    handleFilter = (params) => {
        this.params = params;
        this.requestList();
    }
    // 这是是为了使用封装的baseForm-代码结束

	componentDidMount(){
		this.requestList()
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
    openOrderDetail =()=>{
    	let item = this.state.selectedItem;
    	if(!item){
    		Modal.info({
    			title:'信息',
    			content:'请选择一条订单'
    		})
    		return;
    	}
    	// 打开新窗口
    	window.open(`/#/common/order/detail/${item.id}`,'_blank')
    }
    handleConfirm = ()=>{
    	let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            })
            return;
        }
        axios.ajax({
            url:'/order/ebike_info',
            data:{
                params:{
                    orderId: item.id
                }
            }
        }).then((res)=>{
            if(res.code ==0 ){
                this.setState({
                    orderInfo:res.result,
                    orderConfirmVisble: true
                })
            }
        })
    }
	requestList = () => {
		let _this = this;

        // 这里的代码是为了使用封装好的列表请求——代码开始
        axios.requestList(this,'/order/list',this.params,true);
        // 这里的代码是为了使用封装好的列表请求——代码结束


        // 以下代码是不使用封装好的列表请求
		// axios.ajax({
		// 	url:'/order/list',
		// 	data:{
		// 		params:{
		// 			page:this.params
		// 		}
		// 	},
		// 	isShowLoading:true
		// }).then((res) => {
		// 	let list = res.result.item_list.map((item,index) => {
		// 		item.key = index;
		// 		return item;
		// 	});
		// 	this.setState({
		// 		list,
		// 		pagination: Utils.pagination(res,(current) => {
		// 			_this.params.page = current;
		// 			this.requestList()
		// 		})
		// 	})
		// })
	}
	render(){
		const columns = [
			{
				title: '订单编号',
				dataIndex: 'order_sn'
			},
			{
				title: '车辆编号',
				dataIndex: 'bike_sn'
			},
			{
				title: '用户名',
				dataIndex: 'user_name'
			},
			{
				title: '手机号',
				dataIndex: 'mobile'
			},
			{
				title: '里程',
				dataIndex: 'distance'
			},
			{
				title: '行驶时长',
				dataIndex: 'total_time'
			},
			{
				title: '状态',
				dataIndex: 'status'
			},
			{
				title: '开始时间',
				dataIndex: 'start_time'
			},
			{
				title: '结束时间',
				dataIndex: 'end_time'
			},
			{
				title: '订单金额',
				dataIndex: 'total_fee'
			},
			{
				title: '实付金额',
				dataIndex: 'user_pay'
			},
		];
		const {selectedRowKeys} = this.state;
		const rowSelection = {
          type:'radio',
          selectedRowKeys
        }
		return (
			<div>
				<Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
				</Card>
				<Card style={{marginTop: 10}}>
					<Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
					<Button type="primary" onClick={this.handleConfirm} style={{marginLeft:10}}>结束订单</Button>
				</Card>
				<div className="content-wrap">
					<Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        rowSelection = {rowSelection}
                        onRow={(record,index) => {
                          return {
                            onClick: () => {
                              this.onRowClick(record,index);
                            },  
                          };
                        }}
                        pagination={this.state.pagination}
                    />
				</div>
			</div>
		);
	}
}

// 定义表单，记住不要导出，一个文件只能有一个导出，并且表单定义最后要Form.create({})(*****)；
// 后面会用公用组件BaseForm代替，即用<BaseForm />代替成为<FilterForm />
class FilterForm extends React.Component{

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select
                                style={{width:100}}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="订单时间">
                    {
                        getFieldDecorator('mode')(
                        	<DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                        )
                    }
                </FormItem>
                <FormItem label="~" colon={false}>
                    {
                        getFieldDecorator('end_time')(
                        	<DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                        )
                    }
                </FormItem>
                <FormItem label="订单状态">
                    {
                        getFieldDecorator('order_status')(
                            <Select
                                style={{ width: 150 }}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">结束行程</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);

