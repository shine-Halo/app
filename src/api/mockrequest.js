//对于axios进行二次封装
import axios from  "axios";
//引入进度调,start,进度条开始，done进度条结束
import nProgress from "nprogress";
//引入进度条颜色才能看
import 'nprogress/nprogress.css'


//1:利用axios对象的方法create，去创建一个axios实例
//2:request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径当中会出现apibaseURL:"/api"
    baseURL:"/mock",
    timeout:5000
})

//请求拦裁器:在发请求之前，请求拦裁器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    //config: 配置对象，对象里面有一个属性很重要，headers请求头returnconfig;
    nProgress.start()
    return config
})
//相应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数: 服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    nProgress.done()
    return res.data
},(err) => {
    //响应失败的回调函数
    // return Promise.reject(new Error('failure'))
    return Promise.reject(new Errow('faluir'))
})


//对外暴露
export default requests

