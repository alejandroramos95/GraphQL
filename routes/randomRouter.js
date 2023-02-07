const { Router } = require('express')
const { generarRandoms } = require('../controllers/randomController')
const router = Router()

router.get('/randoms', generarRandoms)

module.exports = router
