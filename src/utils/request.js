import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
import { Message } from 'element-ui'
import store from '../store'
import { getToken, removeToken } from '@/utils/auth'

// 创建axios实例
console.log(process.env.BASE_API)
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 150000, // 请求超时时间
  withCredentials: false, // 跨域
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  data:{page:1,pageSize:10}
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['authorization'] = 'Bearer '+getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    console.log(config)
    // if (config.type == 'GET') {
    //   let dataStr = ''; //数据拼接字符串
    //   Object.keys(data).forEach(key => {
    //     dataStr += key + '=' + data[key] + '&';
    //   })

    //   if (dataStr !== '') {
    //     dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
    //     url = url + '?' + dataStr;
    //   }
    // }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== undefined) {
      if (res.code === '50012') {
        // commit('SET_TOKEN', '')
        // commit('SET_ROLES', [])
        removeToken()
        location.reload()
      } else {
        // Message({
        //   showClose: true,
        //   message: res.message,
        //   type: 'error',
        //   duration: 5 * 1000
        // })
        return response.data
      }

      // // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       location.reload()// 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      // }
      // return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
