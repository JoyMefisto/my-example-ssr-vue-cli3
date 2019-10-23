const path = require('path')
// const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')

const express = require('express')
const app = express()

const resolve = file => path.resolve(__dirname, file)
const isDev = process.env.NODE_ENV !== 'production'
const serve = (pathName, cache) => express.static(resolve(pathName), {
  maxAge: cache && !isDev ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use(favicon('./public/favicon.ico'))
app.use('/dist', serve('../dist', true))
app.use('/css', express.static(resolve('../dist/css')))
app.use('/js', express.static(resolve('../dist/js')))
app.use('/img', express.static(resolve('../dist/img')))

// app.use(cookieParser) // todo: Если включить, то при обращении на сервере будет зависать - разобраться
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

const route = isDev ? require('./dev.ssr') : require('./server')

app.use(route)

const ip = process.env.IP || '0.0.0.0'
const port = process.env.PORT || 3000

app.listen(port, ip, () => {
  console.log(`Server started at ${ip}:${port}`)
})

module.exports = app
