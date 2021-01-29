import axios from 'axios'
import Vue from 'vue';
const request = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

request.interceptors.response.use(
  res => {
    return res
  }, 
  error =>{
    if(error.response.data.message) {
      Vue.prototype.$message({
        type: 'error',
        message: error.response.data.message
      })
    }
  }
)

export default request