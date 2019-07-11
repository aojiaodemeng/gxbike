import React from 'react'
import {Card,Table,Form,Select,Button,Input,Icon,Checkbox,Row,Col} from 'antd'
import Highlighter from 'react-highlight-words';
import axios from './../../axios'
// import './../../style/default.less'
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

export default class HighTable2 extends React.Component{
	state = {
		selectedRowKeys: [],
		dataSource:[],
		filtersList:[],
		searchText: '',
		columns1:[],
		showBox:false,
		scrollWidth: 1300,
		checkedList_fixed:''
	}
	toText = (dataIndex,a) => {
		if (dataIndex == 'sex'){
			return a == 1 ? '男' : '女';
		}else if(dataIndex == 'state'){
			let config = {
                '1':'咸鱼一条',
                '2':'风华浪子',
                '3':'交大才子',
                '4':'百度FE',
                '5':'创业者'
            }
            return config[a];
		}else if(dataIndex == 'interest'){
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
		}else{
			return a;
		}
	}

	requestList = () => {
		let _this = this;
        axios.ajax({
            url:'/table/list',
            data:{
               
           		params:{}
            }
        }).then((res) => {
            if(res.code == '0'){
                res.result.list.map((item,index)=>{
                  item.key = index
                })
                this.setState({
                    dataSource:res.result.list,
                    total:res.result.total_count
                })
                let filtersList = [];
                this.state.dataSource.map((item)=>{
                	for(let i in item){
                		if(!filtersList[i]){
                			filtersList[i]=[{text:this.toText(i,item[i]),value:item[i]}];
                		}
                		let EXISTS  =  filtersList[i].some((item2) => {
                			if(item2.text==this.toText(i,item[i])){
                				return true;
                			}
                		})
                		if(!EXISTS){
                			filtersList[i].push({text:this.toText(i,item[i]),value:item[i]});
                		}
                	}
                })
                this.setState({
                	filtersList,
                	columns1:[
                		{
				          title: 'id',
				          dataIndex: 'id',
				          width: 50,
				        }, {
				          title: '用户名',
				          dataIndex: 'userName',
				          width: 180,
				          ...this.getColumnSearchProps('userName'),
				        }, {
				          title: '性别',
				          dataIndex: 'sex',
				          width: 100,
				          render(a){
				            return a == 1 ? '男' : '女';
				          },
				          ...this.filterBox(filtersList.sex,'sex')

				        }, {
				          title: '状态',
				          dataIndex: 'state',
				          width: 200,
				          render(a){
				            let config = {
				                '1':'咸鱼一条',
				                '2':'风华浪子',
				                '3':'交大才子',
				                '4':'百度FE',
				                '5':'创业者'
				            }
				            return config[a];
				          },
				          ...this.filterBox(filtersList.state,'state')
				        }, {
				          title: '爱好',
				          dataIndex: 'interest',
				          width: 180,
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
				          },
				          ...this.filterBox(filtersList.interest,'interest')
				        }, {
				          title: '生日',
				          dataIndex: 'birthday',
				          width: 180,
				        }, {
				          title: '地址',
				          dataIndex: 'address'
				        }
                	],
                })
                this.getColumns();
            }
        })

	}
	mouseLeave=()=>{
		this.setState({
			showBox:false
		})
	}
	clickBox = () =>{
		let data = !this.state.showBox;
		this.setState({
			showBox: data
		})
	}
	showCheckBox = (data) => {
		if(data){
			return (
				<div className="columnsCheckBox"
					onMouseLeave={this.mouseLeave}
				>
					<div>
			          <Checkbox
			            indeterminate={this.state.indeterminate}
			            onChange={this.onCheckAllChange}
			            checked={this.state.checkAll}
			          >
			            选择所有列
			          </Checkbox>
			        </div>
			        <br />
			        <CheckboxGroup  
			        	options={this.state.plainOptions}
			        	value={this.state.checkedList}
			        	onChange={this.onChange}
			        />
			        <hr style={{border: '1px dashed #e8e8e8'}}/>
			        <Button type="primary" 
			        	onClick={this.fixedChange}
			        	style={{margin:'20px 0 10px 0'}}
		        	>固定此列</Button>
			        <br/>
			        <CheckboxGroup  
			        	options={this.state.checkedList}
			        	value={this.state.checkedList_fixed}
			        	onChange={this.onFixedChange}
			        />
				</div>
			)
		}else{
			return;
		}
	}

	// 动态获取列
	getColumns = () =>{
		let list = [];
		let __srcollWidth=1;
		this.state.columns1.map((item) => {
			list.push(item.title);
			if(item.width){
				__srcollWidth += parseInt(item.width);
			}
			
		})
		this.setState({
			plainOptions: list,
			checkedList:list,
			indeterminate: false,
			checkAll: true,
			newColumns1:this.getNewColumns(list),
			scrollWidth:__srcollWidth,
		})
	}

	// 更新列
	getNewColumns = (list) => {
		let __list = [];
		this.state.columns1.map((item)=>{
			if(list.indexOf(item.title)>-1){
				// 注意__list.push(item)是浅拷贝，改变了原数组；__list.push({...item})是深拷贝
				__list.push({...item})
			}
			return __list;
		})
		// 判断最后一列是否选中，如果未选中，需要去掉新的最后一列的宽度
		if(__list.length < this.state.columns1.length && __list.length>1){
			if(__list[__list.length-1].width){
				delete __list[__list.length-1].width;
			}
		}
		// 判断该列是否是原来列中的非最后一列，并判断是否有设置width，如无，需要添加
		for(let i=0;i<__list.length-1;i++){
			if(!__list[i].width){
				this.state.columns1.map((item)=>{
					if(item.title == __list[i].title){
						__list[i].width = item.width
					}
				})
			}
		}
		return __list;
	}
	onChange = (checkedList) => {
	    this.setState({
	        checkedList,
	        indeterminate: !!checkedList.length && (checkedList.length < this.state.plainOptions.length),
	        checkAll: checkedList.length === this.state.plainOptions.length,
	        newColumns1:this.getNewColumns(checkedList),
	        checkedList_fixed:'',
	        newColumns1_const:this.getNewColumns(checkedList),
	    });

	}	
	onFixedChange = (checkedList) => {
		this.setState({
			checkedList_fixed:checkedList
		})
	}
	fixedChange = () => {
		let __list = [];
		let __list2 = [];
		let __list_noWidth =[];
		let len=this.state.checkedList_fixed.length;
		let __col = this.state.newColumns1_const ? this.state.newColumns1_const : this.state.columns1;
		if(len != this.state.checkedList.length && len>0){
			__col.map((item)=>{
				if(this.state.checkedList_fixed.indexOf(item.title)>-1){
					let list_fixed = {...item};
					list_fixed.fixed = 'left';
					if(item.width){
						__list.push(list_fixed)
					}else{
						__list_noWidth={...item};
					}
				}else{
					__list2.push({...item})
				}
			})
			

			if(__list2[__list2.length-1].width){
				__list_noWidth.width = __list2[__list2.length-1].width;
				__list_noWidth.fixed = 'left';
				__list.push(__list_noWidth)
				delete __list2[__list2.length-1].width;
			}
			this.setState({
				newColumns1:__list.concat(__list2),
			})
		}else if(len==0 || len == this.state.checkedList.length){
			console.log("重新")
			this.setState({
				newColumns1:this.getNewColumns(this.state.checkedList)
			})
		}	
	}
	onCheckAllChange = (e) => {
		console.log(this.state.checkedList)
	    this.setState({
	    	checkedList: e.target.checked ? this.state.plainOptions : [],
	        indeterminate: false,
	        checkAll: e.target.checked,
	        newColumns1:this.getNewColumns(e.target.checked ? this.state.plainOptions : []),
	        checkedList_fixed:'',
	        newColumns1_const:this.getNewColumns(e.target.checked ? this.state.plainOptions : []),
	    });
	}

	componentDidMount(){
		this.requestList();
	}
	
	onSelectChange = (selectedRowKeys) => {
	    console.log('selectedRowKeys changed: ', selectedRowKeys);
	    this.setState({ selectedRowKeys });
	  }
  	// 搜索
	getColumnSearchProps = (dataIndex) => ({
		filterDropdown :({
			setSelectedKeys, selectedKeys, confirm, clearFilters,
		}) => (
			<div style={{padding:8}}>
				<Input 
					ref={node => { this.searchInput = node; }}
					onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
					onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					placeholder ={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					style={{ width: 188, marginBottom: 8, display: 'block' }}
				/>
					<Button
					type="primary"
		        	icon="search"
		        	size="small"
		        	onClick={() => this.handleSearch(selectedKeys, confirm)}
		        	style={{ width: 90, marginRight: 8 }}
		        >
		        	search
	        	</Button>
	        	<Button
	        		onClick={() => this.handleReset(clearFilters)}
	        		size="small"
	        		style={{ width: 90 }}
	    		>
					Reset
				</Button>
			</div>
			
		),
		filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1DA57A' : undefined }} />,
		onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: (visible) => {
	      if (visible) {
	        setTimeout(() => this.searchInput.select());
	      }
	    },
	    render: (text) => (
	      <Highlighter
	        highlightStyle={{ backgroundColor: '#1DA57A', padding: 0 }}
	        searchWords={[this.state.searchText]}
	        autoEscape
	        textToHighlight={text.toString()}
	      />
	    ),

	})
	handleSearch = (selectedKeys,confirm) => {
		confirm();
		this.setState({
			searchText: selectedKeys[0]
		})
	}
	handleReset = (clearFilters) => {
		clearFilters();
		this.setState({
			searchText: ''
		})
	}
	// 过滤
	filterBox = (filtersList,dataIndex) => ({
		filters: filtersList,
      	onFilter: (value, record) => {
      		if(record[dataIndex]==value){
      			return record;
      		}
      	},
	})
	render(){

		const { selectedRowKeys,filtersList,columns1,plainOptions,checkedList,newColumns1 } = this.state;
		const columns = [
			{
	          title: 'id',
	          dataIndex: 'id',
	          width: 50,
	          fixed: 'left'
	        }, {
	          title: '用户名',
	          dataIndex: 'userName',
	          width: 180,
	          fixed: 'left',
	          ...this.getColumnSearchProps('userName'),
	        }, {
	          title: '性别',
	          dataIndex: 'sex',
	          width: 100,
	          render(a){
	            return a == 1 ? '男' : '女';
	          },
	          ...this.filterBox(filtersList.sex,'sex')

	        }, {
	          title: '状态',
	          dataIndex: 'state',
	          width: 200,
	          render(a){
	            let config = {
	                '1':'咸鱼一条',
	                '2':'风华浪子',
	                '3':'交大才子',
	                '4':'百度FE',
	                '5':'创业者'
	            }
	            return config[a];
	          },
	          ...this.filterBox(filtersList.state,'state')
	        }, {
	          title: '爱好',
	          dataIndex: 'interest',
	          width: 180,
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
	          },
	          ...this.filterBox(filtersList.interest,'interest')
	        }, {
	          title: '生日',
	          dataIndex: 'birthday',
	          width: 180
	        }, {
	          title: '地址',
	          dataIndex: 'address',
	        }
        ];
		const rowSelection = {
		  type:'checkbox',  
	      selectedRowKeys,
	      onChange: this.onSelectChange,
	    };
	    const pagination = {
	    	showTotal: ()=>`共${this.state.total}条`,
	    	showQuickJumper:true
	    }
		return (
			<React.Fragment>
				<Card title="高级表格——支持行列锁定、隐藏、过滤、快速检索" >
					<div className="columnsWrap">
							{this.showCheckBox(this.state.showBox)}
							<div 
								onClick={this.clickBox}
								style={{color: this.state.showBox ||(!this.state.showBox && !this.state.checkAll) ? '#1DA57A' : ''}}
							>
								<Icon type="menu-fold" />
								<span>自定义列</span>
							</div>
					</div>
					
					<Table 
						bordered
						dataSource={this.state.dataSource} 
						columns={newColumns1}
						rowSelection={rowSelection}
						scroll={{ y: 350,x:this.state.scrollWidth + 500}}
						pagination={pagination}
					/>
				</Card>
			</React.Fragment>
		)
	}
}