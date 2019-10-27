require('dotenv').config()

// const qs = require('qs')
const axios = require('axios')
// const https = require('https')
// const httpClient = require('../../../src/api/instance').default
// const httpClient = require('../../../src/api/instance')
// const setCookiesToBrowser = require('./_cookie')
//
// console.log('SERVER process.env.VUE_APP_API_HOST', process.env.VUE_APP_API_HOST)
//
// function getHttpClient (contentType) {
//   const responseType = {
//     'application/json': 'json',
//     image: 'arraybuffer'
//   }
//
//   const result = Object.keys(responseType).find(
//     txt => contentType.indexOf(txt) !== -1)
//
//   return axios.create({
//     baseURL: process.env.VUE_APP_API_HOST,
//     responseType: responseType[result] || 'arraybuffer', // default
//     httpsAgent: new https.Agent({
//       rejectUnauthorized: false
//     }),
//     withCredentials: false
//   })
// }

// const httpClient = axios.create({
//   baseURL: process.env.VUE_APP_API_HOST,
//   httpsAgent: new https.Agent({
//     rejectUnauthorized: false
//   }),
//   withCredentials: false,
//   headers: {
//     'Content-Type': 'application/json;charset=UTF-8'
//   },
//   responseType: responseType[result] || 'arraybuffer' // default
// })
//
// function setBodyToAPI (req) {
//   return qs.stringify(req.body)
// }
//
// function setHeaderToAPI (req) {
//   const result = {
//     headers: {
//       ...req.headers
//     }
//   }
//
//   if (req.method.toLowerCase() === 'post') {
//     // TODO: Опрелять content-type в экшенах,
//     // TODO: затем брать его из post-запроса
//     result.headers['content-type'] = 'application/x-www-form-urlencoded'
//   }
//
//   delete result.headers.host
//
//   return result
// }
//
// function finish (responseToBrowser, responseFromAPI) {
//   // Ставим остальные хедеры и очищаем нежелательные
//   responseToBrowser.set({
//     ...responseFromAPI.headers
//   })
//   responseToBrowser.removeHeader('X-Powered-By')
//   responseToBrowser.removeHeader('x-cache-tags')
//
//   // Отправляем ответ со статусом
//   responseToBrowser.status(responseFromAPI.status)
//   console.log('responseFromAPI.data', responseFromAPI.data)
//   // responseToBrowser.send(responseFromAPI.data || responseFromAPI.statusText)
//   responseToBrowser.send(responseFromAPI.data.toString('binary'))
//
//   // const data = {"page":2,"per_page":6,"total":12,"total_pages":2,"data":[{"id":7,"email":"michael.lawson@reqres.in","first_name":"Michael","last_name":"Lawson","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg"},{"id":8,"email":"lindsay.ferguson@reqres.in","first_name":"Lindsay","last_name":"Ferguson","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg"},{"id":9,"email":"tobias.funke@reqres.in","first_name":"Tobias","last_name":"Funke","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/vivekprvr/128.jpg"},{"id":10,"email":"byron.fields@reqres.in","first_name":"Byron","last_name":"Fields","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg"},{"id":11,"email":"george.edwards@reqres.in","first_name":"George","last_name":"Edwards","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/mrmoiree/128.jpg"},{"id":12,"email":"rachel.howell@reqres.in","first_name":"Rachel","last_name":"Howell","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/hebertialmeida/128.jpg"}]}
//   // responseToBrowser.json(JSON.stringify(data))
//   responseToBrowser.end()
// }
//
// function onSuccess (responseToBrowser, responseFromAPI) {
//   // Удаляем инфу про кэширование
//   // Незачем школьникам всяким знать что у нас друпал есть
//   delete responseFromAPI.data.cache
//
//   // Формируем команду поставить куку, если они пришли из API
//   if (responseFromAPI.headers) {
//     if (responseFromAPI.headers['set-cookie']) {
//       setCookiesToBrowser(responseToBrowser, responseFromAPI.headers['set-cookie'])
//     }
//   }
//
//   finish(responseToBrowser, responseFromAPI)
// }
//
// function onFail (responseToBrowser, responseFromAPI) {
//   finish(responseToBrowser, responseFromAPI)
// }

module.exports = {
  makeRequestToAPI (req, res) {
    // const httpClient = getHttpClient(req.headers.accept)
    const method = req.method.toLowerCase()
    const url = req.originalUrl.split('/').slice(2).join('/')
    // const additionalData = method.toUpperCase() === 'GET'
    //   ? [setHeaderToAPI(req)]
    //   : [setBodyToAPI(req), setHeaderToAPI(req)]

    // res.setHeader('Access-Control-Allow-Origin', '*')
    // const data = {"page":2,"per_page":6,"total":12,"total_pages":2,"data":[{"id":7,"email":"michael.lawson@reqres.in","first_name":"Michael","last_name":"Lawson","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg"},{"id":8,"email":"lindsay.ferguson@reqres.in","first_name":"Lindsay","last_name":"Ferguson","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg"},{"id":9,"email":"tobias.funke@reqres.in","first_name":"Tobias","last_name":"Funke","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/vivekprvr/128.jpg"},{"id":10,"email":"byron.fields@reqres.in","first_name":"Byron","last_name":"Fields","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg"},{"id":11,"email":"george.edwards@reqres.in","first_name":"George","last_name":"Edwards","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/mrmoiree/128.jpg"},{"id":12,"email":"rachel.howell@reqres.in","first_name":"Rachel","last_name":"Howell","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/hebertialmeida/128.jpg"}]}
    // console.log('data', data)
    // res.json(data)

    // ${process.env.VUE_APP_API_HOST}
    // return httpClient[method](`${url}`, ...additionalData)
    //   .then(
    //     response => {
    //       console.log('RESPONSE', response.data)
    //
    //       res.send(response.data)
    //     },
    //     error => {
    //       res.send({ 'error': error })
    //     }
    //   )

    return axios[method](`${process.env.VUE_APP_API_HOST}${url}`)
      .then(response => {
        console.log('response.data', response.data)
        res.json(response.data)
      })
      .catch(error => {
        console.log(error)
      })

    // ${process.env.VUE_APP_API_HOST}

  //   return httpClient[method](`${url}`)
  //     .then(response => {
  //       console.log('response.data', response.data)
  //       res.json(response.data)
  //     })
  //     .catch(error => {
  //       console.log(error.message)
  //     })
  }
}
