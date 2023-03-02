import axios from 'axios'
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000

console.log('环境变量的使用', process.env.VUE_APP_BASE_URL)

axios
  .get('/get', {
    params: {
      name: 'll',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })
axios
  .post('http://httpbin.org/post', {
    params: {
      name: 'll',
      age: 18
    },
    timeout: 5000
  })
  .then((res) => {
    console.log(res.data)
  })
