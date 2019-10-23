const webpack = require('webpack')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const fs = require('fs')
const path = require('path')

const resolve = file => path.resolve(__dirname, file)
const webpackConfig = require('@vue/cli-service/webpack.config')
const { createBundleRenderer } = require('vue-server-renderer')
const serverCompiler = webpack(webpackConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

// По готовности конфига webpack'a сохраняем бандл
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

/**
 * Контроллер для отправка готового html документа
 * @param req
 * @param res
 * @param next
 * @returns {Q.Promise<Q.Promise<any> | * | void | boolean>}
 */
const handleRequest = async (req, res, next) => {
  if (!bundle) {
    return res.send('Упс, что-то пошло не так..')
  }

  // Ждём и получаем манифест
  // todo: Хочется сделать без axios
  const clientManifestResp = await axios.get('http://localhost:8080/vue-ssr-client-manifest.json')
  const clientManifest = clientManifestResp.data
  // Renderer функция для парсинга шаблона
  // Засовываем бандл в шаблон
  const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: fs.readFileSync(resolve('../src/index.temp.html'), 'utf-8'),
    clientManifest: clientManifest
  })
  // Контекст используется на клиенте для манипулирования состоянием
  const context = {
    url: req.url,
    cookie: req.cookies,
    host: req.headers.host
  }
  const html = await renderToString(context, renderer)

  console.log('SEND HTML FROM SERVER')
  res.send(html)
}

/**
 * Возвращает html, отрисованного на основе контекста и шаблона
 * @param context
 * @param renderer
 * @returns {Promise<unknown>}
 */
function renderToString (context, renderer) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html)
    })
  })
    .catch(e => e)
}

module.exports = handleRequest
