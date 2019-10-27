require('dotenv').config()

const path = require('path')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const backendProxy = require('../proxy')

const resolve = file => path.resolve(__dirname, file)
const isDev = process.env.NODE_ENV !== 'production'
const serve = (pathName, cache) => express.static(resolve(pathName), {
  maxAge: cache && !isDev ? 1000 * 60 * 60 * 24 * 30 : 0 // one month
})

app.use(favicon('./public/favicon.ico')) // Избавляет от запроса на favicon

// Нужно для прод режима
app.use('/css', serve('../dist/css', true))
app.use('/js', serve('../dist/js', true))
app.use('/img', serve('../dist/img', true))

app.use(cookieParser()) // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(bodyParser.json()) // Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option. This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.
app.use(bodyParser.urlencoded({ extended: false })) // Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option. This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.

const controller = isDev ? require('./dev.ssr') : require('./prod.ssr')

app.use(backendProxy)
app.use('*', controller)

const ip = process.env.IP || '0.0.0.0'
const port = process.env.PORT || 3000

app.listen(port, ip, () => {
  console.log(`Server started at ${ip}:${port}`)
})

module.exports = app
