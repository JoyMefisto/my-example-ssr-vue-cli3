const axios = require('axios')
// import https from 'https'

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_ENV === 'server' ? process.env.VUE_APP_API_HOST : '/api/'
  // baseURL: target === 'server' ? process.env.VUE_APP_API_HOST : '/api/'
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false
  // }),
  // withCredentials: false
})

console.log('process.env.WEBPACK_TARGET', process.env.WEBPACK_TARGET)
console.log('process.env.VUE_APP_API_ENV', process.env.VUE_APP_API_ENV)
console.log('process.env.VUE_APP_API_HOST', process.env.VUE_APP_API_HOST)

httpClient.interceptors.request.use(
  (request) => {
    return request
  },
  (error) => {
    return error
  }
)

httpClient.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    // Если ошибка связана с отменой запроса клиентом - пробрасываем ошибку как есть.
    if (axios.isCancel(error)) return Promise.reject(error.response)

    // const returnError = {
    //   status: error.response.status || undefined,
    //   statusText: error.response.statusText || undefined,
    //   method: error.response.config.method || undefined,
    //   url: error.response.config.url || undefined,
    //   data: (error.response.data.data ? error.response.data.data : error.response.data) || {},
    //   headers: error.response.headers || {}
    // }

    return Promise.reject(error.response)
  }
)

module.exports = httpClient
