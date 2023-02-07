const { Router } = require('express')
const { testFaker } = require('../controllers/testController')
const router = Router()

router.get('/', testFaker)

module.exports = router
