const router = require('express')()

const { backend } = require('./routers')

/* Все остальные запросы */
router.use('/api/*', backend)

module.exports = router
