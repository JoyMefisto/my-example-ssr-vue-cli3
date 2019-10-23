import { createApp } from './main'

export default context => new Promise((resolve, reject) => {
  const { app, router, store } = createApp()

  // console.log('context.url', context.url)
  router.push(context.url)

  // set meta info
  // context.meta = app.$meta()

  // wait until router has resolved possible async hooks
  router.onReady(() => {
    context.rendered = () => {
      // записываем стейт в контекст, в шаблоне он будет сгенерирован, как window.__INITIAL_STATE__
      context.state = store.state
    }

    const matchedComponents = router.getMatchedComponents()
    // console.log('matchedComponents', matchedComponents)
    // no matched routes
    if (!matchedComponents.length) {
      // return reject({ code: 404 })
      return reject(new Error('no components matched'))
    }

    return resolve(app)
  }, reject)
})
