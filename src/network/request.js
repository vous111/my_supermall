import axios from "axios";
import {BASE_URL} from "common/const"

 export function request(config){
   const instance = axios.create({
     baseURL: BASE_URL,
     timeout: 5000
   });

  // axios拦截器  
   instance.interceptors.request.use(
     config =>{
      //  console.log(config);
      return config
     },
     err=>{
       console.log(err);
     }
   )

   instance.interceptors.response.use(
     res=>{
       return res.data;
     },
     err=>{
       console.log(err)
     }
   )

    //  发送真正的网络请求
     return instance(config)
 }