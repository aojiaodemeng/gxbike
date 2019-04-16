import React from 'react'
import {Card,Button,Modal,Radio,DatePicker,Input,Form,Select} from 'antd'
import axios from './../../axios/index.js'
import Utils from './../../utils/utils.js'
import BaseForm from './../../components/BaseForm'
import ETable from './../../components/ETable'
import moment from 'moment'
const FormItem=Form.Item;
const RadioGroup=Radio.Group;
const TextArea=Input.TextArea;
const Option=Select.Option;
export default class User extends React.Component{
	state={
		isVisible:false
	}
	params = {
		page: 1
	}
	formList = [
        {
            type:'INPUT',
            label:'用户名',
            field:'user_name',
            placeholder:'请输入用户名称',
            width:180
    	},
    	{
            type:'INPUT',
            label:'用户名手机号',
            field:'user_mobile',
            placeholder:'请输入手机号',
            width:180
    	},
        {
            type:'DATE',
            label:'请选择入职日期',
            field:'user_dete',
            placeholder:'请输入日期'
        }
    ]

    componentDidMount () {
    	this.requestList();
    }

    handleFilter = (params) => {
    	this.params = params;
    	this.requestList();
    }
    requestList = () => {
    	axios.requestList(this,'/user/list',this.params)
    }
    handleOperate  = (type) => {
    	let item=this.state.selectedItem;
    	if(type == 'create'){
    		this.setState({
    			type,
    			isVisible:true,
    			title:'创建员工'
    		})
    	}else if(type == 'edit'){
    		if(!item){
    			Modal.info({
    				title:'提示',
    				content:'请选择一个用户'
    			})
    			return;
    		}
    		this.setState({
    			type,
    			isVisible:true,
    			tile:'编辑员工',
    			userInfo:item
    		})
    	}else if(type == 'detail'){
    		if(!item){
    			Modal.info({
    				title:'提示',
    				content:'请选择一个用户'
    			})
    			return;
    		}
    		this.setState({
    			type,
    			isVisible:true,
    			tile:'员工详情',
    			userInfo:item
    		})
    	}else if(type == 'delete'){
    		if(!item){
    			Modal.info({
    				title:'提示',
    				content:'请选择一个用户'
    			})
    			return;
    		}
    		let _this = this;
    		Modal.confirm({
    			title:'确认删除',
    			content:'是否删除选中的员工',
    			onOk(){
    				axios.ajax({
    					url:'/user/delete',
    					data:{
    						params:{
    							id:item.id
    						}
    					}
    				}).then((res) => {
    					if(res.code == 0){
    						_this.setState({
    							isVisible:false
    						})
    						_this.requestList();
    					}
    				})
    			}
    		})
    	}
    }
    handleSubmit = () => {
    	let type=this.state.type;
    	let data = this.userForm.props.form.getFieldsValue();
    	axios.ajax({
    		url: type=='create' ? '/user/add' : '/user/edit',
    		data:{
    			params:data
    		}
    	}).then((res) => {
    		if(res.code==0){
    			this.userForm.props.form.resetFields();
    			this.setState({
    				isVisible:false
    			})
    			this.requestList();
    		}
    	})
    }
	render(){
		const columns = [
			{
				title: 'id',
				dataIndex: 'id'
			},
			{
				title: '用户名',
				dataIndex: 'username'
			},
			{
				title: '性别',
				dataIndex: 'sex',
				render(sex){
					return sex==1 ? '男' : '女'
				}
			},
			{
				title: '状态',
				dataIndex: 'state',
				render(state){
					return {
						'1':'咸鱼',
						'2':'交大才子',
						'3':'风华正茂',
						'4':'疯狂敲代码中',
						'5':'几度春秋'
					}[state]
				}
			},
			{
				title: '爱好',
				dataIndex: 'interest',
				render(interest){
					return {
						'1':'足球',
						'2':'篮球',
						'3':'跑步',
						'4':'王者荣耀',
						'5':'LOL',
						'6':'睡觉',
						'7':'吃',
						'8':'发呆'
					}[interest]
				}
			},
			{
				title: '生日',
				dataIndex: 'birthday'
			},
			{
				title: '地址',
				dataIndex: 'address'
			},
		]
		let footer = {};
		if(this.state.type == 'detail'){
			footer = {
				footer : null
			}
		}
		return(
			<div>
				<Card>
					<BaseForm  formList={this.formList} filterSubmit={this.handleFilter}/>	
				</Card>		
				<Card style={{marginTop: 10}} className="operate-wrap">
					<Button type="primary" icon ="plus" onClick={() => this.handleOperate('create') }>创建员工</Button>
					<Button type="primary" icon="edit" onClick={() => this.handleOperate('edit') }>编辑员工</Button>
					<Button type="primary" onClick={() => this.handleOperate('detail') }>员工详情</Button>
					<Button type="primary" icon="delete" onClick={() => this.handleOperate('delete') }>删除员工</Button>
				</Card>
				<div className="content-wrap">
					<ETable
						updateSelectedItem={Utils.updateSelectedItem.bind(this)}
						columns={columns}
						dataSource={this.state.list}
						selectedRowKeys={this.state.selectedRowKeys}
						selectedItem={this.state.selectedItem}
						pagination={false}
					/>
				</div>
				<Modal
					title={this.state.title}
					visible={this.state.isVisible}
					onOk={this.handleSubmit}
					onCancel={()=>{
						this.setState({
							isVisible:false
						})
					}}
					width={600}
					{...footer}
				>
					<UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst) => this.userForm = inst} />
				</Modal>
			</div>
		);
	}
}


class UserForm extends React.Component{
	getState = (state) => {
		return {
			'1':'咸鱼',
			'2':'交大才子',
			'3':'风华正茂',
			'4':'疯狂敲代码中',
			'5':'几度春秋'
		}[state]
	}
	render() {
		let type = this.props.type;
		let userInfo = this.props.userInfo || {};
		const { getFieldDecorator } = this.props.form;
		const formItemLayout={
			labelCol:{span:5},
			wrapperCol:{span:16}
		}
		return(
			<Form layout="horizontal">
				<FormItem label="用户名" {...formItemLayout}>
					{
						type=='detail' ? userInfo.username :
						getFieldDecorator('user_name',{
							initialValue:userInfo.username
						})(
							<Input type="text" placeholder="请输入用户名" />
						)
					}
				</FormItem>
				<FormItem label="性别" {...formItemLayout}>
					{
						type=='detail' ? userInfo.sex==1?'男':'女' :
						getFieldDecorator('sex',{
							initialValue:userInfo.sex
						})(
							<RadioGroup>
								<Radio value={1}>男</Radio>
								<Radio value={2}>女</Radio>
							</RadioGroup>
						)
					}
				</FormItem>
				<FormItem label="状态" {...formItemLayout}>
					{
						type=='detail' ? this.getState(userInfo.state) :
						getFieldDecorator('state',{
							initialValue:userInfo.state
						})(
							<Select>
								<Option value={1}>咸鱼</Option>
								<Option value={2}>交大才子</Option>
								<Option value={3}>风华正茂</Option>
								<Option value={4}>疯狂敲代码中</Option>
								<Option value={5}>几度春秋</Option>
							</Select>
						)
					}
				</FormItem>
				<FormItem label="生日" {...formItemLayout}>
					{
						type=='detail' ? userInfo.birthday :
						getFieldDecorator('birthday',{
							initialValue:moment(userInfo.birthday)
						})(
							<DatePicker />
						)
					}
				</FormItem>
				<FormItem label="地址" {...formItemLayout}>
					{
						type=='detail' ? userInfo.address :
						getFieldDecorator('address',{
							initialValue:userInfo.address
						})(
							<TextArea rows={3} placeholder="请输入联系地址" />
						)
					}
				</FormItem>
			</Form>
		);
	}
}
UserForm = Form.create({})(UserForm);