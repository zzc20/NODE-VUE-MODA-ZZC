import axios from 'axios'
import Vue from 'vue';
import router from '../router'
const request = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})


request.interceptors.request.use((config) => {
  // Do something before request is sent
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config
}, function (err) {
  // Do something with request err
  return Promise.reject(err);
});


request.interceptors.response.use(
  res => {
    return res
  }, 
  err => {
    // 当服务端返回的信息又错误的时候执行以下方法
    if(err.response.data.message) {
      Vue.prototype.$message({
        type: 'err',
        message: err.response.data.message
      })
      if (err.response.status === 401) {
        router.push('/login')
      }
    }
    
    return Promise.reject(err)
  }
)

export default request