const { Router } = require('express')
const { registrarNuevoUsuario, logOutUsuario } = require('../controllers/sessionController')
const passport = require('passport')
const router = Router()

router.post(
  '/login',
  passport.authenticate('login', {
    successRedirect: '/main',
    failureRedirect: '/login-error',
    passReqToCallback: true,
  })
)
router.post('/register', registrarNuevoUsuario)
router.get('/logout', logOutUsuario)

module.exports = router
