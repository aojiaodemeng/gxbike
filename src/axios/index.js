import JsonP from 'jsonp'

export default class Axios{
    static jsonp(options){
        return new Promise((resolve,reject) => {
            JsonP(options.url,{
                param:'callback',   //默认就是callback，因为是跨域的，所以一定要用callback来接收
                timeout: 2000   //默认是6000
            },function(err,response){
                console.log("3");
                if(err){
                    console.log("4")
                    console.log(response)
                    console.log(err)
                }else{
                    console.log("5")
                    console.log(response)
                    console.log(err)
                }
                // if(response){
                //     resolve(response);
                // }else{
                //     reject(err.message);
                // }

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