const router = require('express').Router()
const { backend: { makeRequestToAPI } } = require('../controllers')

router.all('/', makeRequestToAPI)

/* TODO: makeRequestToAPI разделить на два контроллера
 * TODO: создать корректный httpClient с возможностью
 * TODO: динамически изменять домен запроса(куда обращаемся)
 */
// router.route('/')
//   .post(makeRequestToAPIGet);
//   .post(makeRequestToAPIPost);

module.exports = router
