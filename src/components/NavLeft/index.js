import React from 'react'
import { Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from './../../redux/action'
import './index.less'
import MenuConfig from './../../config/menuConfig'

const SubMenu = Menu.SubMenu;
class NavLeft extends React.Component{
    state = {
        currentKey: ''
    }
    // 菜单点击
    handleClick = ({ item, key }) => {
        if (key == this.state.currentKey) {
            return false;
        }
        // 事件派发，自动调用reducer，通过reducer保存到store对象中
        const { dispatch } = this.props;
        dispatch(switchMenu(item.props.title));

        this.setState({
            currentKey: key
        });
        // hashHistory.push(key);
    };
    componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig);
        // 哈希路由url路径中含有#（比如在console页面输入location.hash就会出现"#/permission"后面还有可能出现？****等内容）
        let currentKey = window.location.hash.replace(/#|\?.*$/g,'');

        this.setState({
            currentKey,
            menuTreeNode
        })
    }
    //菜单渲染
    renderMenu=(data)=>{
        return data.map((item) => {
            if(item.children){
                return(
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key} >
                {/*{item.title}*/}
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }
    render(){
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>Imooc MS</h1>
                </div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={this.state.currentKey}
                    theme="dark"
                >
                    {this.state.menuTreeNode}
                    {/*<SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>*/}
                        {/*<Menu.Item key="1">Option 1</Menu.Item>*/}
                        {/*<Menu.Item key="2">Option 2</Menu.Item>*/}
                        {/*<Menu.Item key="3">Option 3</Menu.Item>*/}
                        {/*<Menu.Item key="4">Option 4</Menu.Item>*/}
                    {/*</SubMenu>*/}
                </Menu>
            </div>
        );
    }
}
export default connect()(NavLeft);