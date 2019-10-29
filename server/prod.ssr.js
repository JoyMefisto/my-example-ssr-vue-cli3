const fs = require('fs')
const path = require('path')

const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

/**
 * Renderer функция для парсинга шаблона
 * @type {BundleRenderer}
 */
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: fs.readFileSync(resolve('../src/index.temp.html'), 'utf-8'),
  basedir: resolve('../dist'),
  clientManifest: clientManifest
})

/**
 * Возвращает html, отрисованного на основе контекста и шаблона
 * @param context
 * @returns {Promise<unknown>}
 */
function renderToString (context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html)
    })
  })
    .catch(e => e)
}

/**
 * Контроллер для отправка готового html документа
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const handleRequest = async (req, res, next) => {
  const context = {
    title: 'ssr test',
    url: req.baseUrl,
    cookie: req.cookies,
    headers: req.headers
  }
  const html = await renderToString(context)

  res.send(html)
}

module.exports = handleRequest
