const fs = require('fs')
const path = require('path')
const { Router } = require('express')
const router = Router()

const resolve = file => path.resolve(__dirname, file)

// 2 createBundleRenderer
const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: fs.readFileSync(resolve('../src/index.temp.html'), 'utf-8'),
  basedir: resolve('../dist'),
  clientManifest: clientManifest
})

function renderToString (context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html)
    })
  })
    .catch(e => e)
}

// 3
const handleRequest = async (req, res, next) => {
  const url = req.url
  console.log('URL', url)

  // if (url.includes('.')) {
  //   // console.log(`proxy ${url}`)
  //   // return await send(ctx, url, {root: path.resolve(__dirname,'../dist')})
  //   const publicData = await path.resolve(__dirname, '../dist')
  //   console.log('publicData', publicData)
  //   console.log('=====================')
  //
  //   return res.send(req, url, { root: publicData })
  // }

  // res.setHeader('Content-Type', 'text/html')

  const context = {
    title: 'ssr test',
    url: req.url,
    cookie: req.cookies,
    headers: req.headers
  }
  // 将 context 数据渲染为 HTML
  const html = await renderToString(context)
  console.log('html', html)
  res.send(html)
}

router.get('*', handleRequest)
module.exports = router
