const { Router } = require('express')
const { getInfoSystem } = require('../controllers/infoController.js')
const router = Router()

router.get('/info', getInfoSystem)

module.exports = router
