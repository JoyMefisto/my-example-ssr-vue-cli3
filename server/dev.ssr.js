const webpack = require('webpack')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const fs = require('fs')
const path = require('path')
const { Router } = require('express')
const router = Router()

// 1、webpack
const webpackConfig = require('@vue/cli-service/webpack.config')
const { createBundleRenderer } = require('vue-server-renderer')

// 2 webpack
const serverCompiler = webpack(webpackConfig)
const mfs = new MemoryFS()
// 指定输出到的内存流中
serverCompiler.outputFileSystem = mfs
// 3 vue-ssr-server-bundle.json
let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) {
    throw err
  }
  stats = stats.toJson()
  stats.errors.forEach(error => console.error(error))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(
    webpackConfig.output.path,
    'vue-ssr-server-bundle.json'
  )

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})

const handleRequest = async (req, res, next) => {
  if (!bundle) {
    return res.send('Упс, что-то пошло не так..')
  }

  // const url = req.url

  // if (url.includes('favicon.ico')) {
  //   console.log(`proxy ${url}`)
  //   // return await send(ctx, url, { root: path.resolve(__dirname, '../public') })
  //   const publicData = await path.resolve(__dirname, '../public')
  //   return res.send(req, url, { root: publicData })
  // }

  // 4、获取最新的 vue-ssr-client-manifest.json
  const clientManifestResp = await axios.get('http://localhost:8080/vue-ssr-client-manifest.json')
  // const clientManifestResp = await path.resolve(__dirname, '../dist/vue-ssr-client-manifest.json')

  const clientManifest = clientManifestResp.data

  const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: fs.readFileSync(path.resolve(__dirname, '../src/index.temp.html'), 'utf-8'),
    clientManifest: clientManifest
  })

  const context = {
    url: req.url,
    cookie: req.cookies,
    host: req.headers.host
  }

  // const html = await renderToString(ctx, renderer)
  const html = await renderToString(context, renderer)
  // ctx.body = html
  console.log('SEND HTML FROM SERVER')
  res.send(html)
}

function renderToString (context, renderer) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html)
    })
  })
    .catch(e => e)
}

router.get('*', handleRequest)

module.exports = router
