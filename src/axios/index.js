import originJSONP from 'jsonp'
import axios from 'axios'
import {Modal} from 'antd'
import Utils from './../utils/utils.js'

export default class Axios{

    // 订单页面请求列表,真正与服务器对接时，将isMock参数相关代码去掉
    static requestList(_this,url,params,isMock){
        var data = {
            params: params,
            isMock
        }
        this.ajax({
            url,
            data
        }).then((data) => {
            if(data && data.result){
                let list = data.result.item_list.map((item,index) => {
                    item.key = index;
                    return item;
                });
                _this.setState({
                    list,
                    pagination: Utils.pagination(data,(current) => {
                        _this.params.page = current;
                        _this.requestList()
                    })
                })
            }
        })
    }
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            originJSONP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if (response.info == 'OK') {
                    resolve(response.lives[0]);
                } else {
                    reject(response.messsage);
                }
            })
        })
    }

    static ajax(options){
        let loading;
        if(options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseApi = '';
        if(options.isMock){
            baseApi='https://easy-mock.com/mock/5caeedf7085b936cbae82c66/gxbikeapi';
        }else{
            baseApi='https://easy-mock.com/mock/5caeedf7085b936cbae82c66/gxbikeapi';
        }
        return new Promise((resolve,reject) => {
            // let baseApi='https://easy-mock.com/mock/5caeedf7085b936cbae82c66/gxbikeapi';
            axios({
                url:options.url,
                method: 'get',
                baseURL: baseApi,
                timeout:2000,
                params:(options.data && options.data.params) || ''
            }).then((response) => {
                if(options.data && options.data.isShowLoading !== false){
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if(response.status == '200'){
                    let res = response.data
                    if(res.code == 0){
                        resolve(res)
                    }else{
                        Modal.info({
                            title:'提示',
                            content:res.msg
                        })
                    }
                }else{
                    reject(response.data)
                }
            })
        })
    }
}


//
// export default class Axios{
//     static jsonp(options){
//         return new Promise ((resolve,reject)=>{
//             JsonP(options.url,{
//                 param:'callback'
//             },function(err,response){
//             //    to do
//                 console.log("2222");
//                 if(response){
//                     console.log("4");
//                     resolve(response);
//                 }else{
//                     console.log("5");
//                     reject(err);
//                 }
//             })
//         })
//     }
// }