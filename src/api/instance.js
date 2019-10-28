const axios = require('axios')

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_ENV === 'server' ? process.env.VUE_APP_API_HOST : '/'
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

    return Promise.reject(error.response)
  }
)

module.exports = httpClient
