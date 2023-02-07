// USO DE EXPRESS-SESSION
const UtilsSession = require('../services/UtilsSession.js')
const SessionService = require('../persistence/DAOs/Session.js')
const sessionService = new SessionService()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// LOGIN STRATEGY
passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'emailUser',
      passwordField: 'passwordUser',
      passReqToCallback: true,
    },
    async (req, emailUser, passwordUser, done) => {
      const usuario = await sessionService.buscarUsuarioPorEmail(emailUser)
      if (!usuario) return done(null, false)
      if (!UtilsSession.isValidPassword(usuario, passwordUser)) return done(null, false)
      return done(null, usuario)
    }
  )
)

// Serialize
passport.serializeUser((user, done) => {
  done(null, user.email)
})

// Deserialize
passport.deserializeUser(async (email, done) => {
  const user = await sessionService.buscarUsuarioPorEmail(email)
  done(null, user)
})

// REGISTRO
async function registrarNuevoUsuario(req, res) {
  const registerData = { email: req.body.registerEmail, password: req.body.registerPassword }
  const response = await sessionService.registrarUsuario(registerData)
  if (response) {
    res.redirect('/login')
  } else {
    res.redirect('/register-error')
  }
}

// ELIMINAR SESSION
function logOutUsuario(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: 'Logout ERROR', body: err })
    }
  })
  res.redirect('/login')
}

module.exports = { registrarNuevoUsuario, logOutUsuario, passport }
