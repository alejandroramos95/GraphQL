const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cookieParser = require('cookie-parser')
const UtilsSession = require('./services/UtilsSession.js')
const passport = require('passport')
const yargs = require('yargs/yargs')(process.argv.slice(2))
// nodemon server.js -p INGRESEPUERTO
const args = yargs.default({ port: 8080 }).alias({ port: 'p' }).argv

const serviceLoggerPino = require('./services/LoggerPino.js')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const PORT = process.env.PORT || args.port
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
;(module.exports = io), args

// Public statement
app.use(express.static('public'))

// Middleware loggers
app.use((req, res, next) => {
  serviceLoggerPino.routeAndMethodsInfo(req)
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(UtilsSession.createOnMongoStore())

// MIDDLEWARE PASSPORT

app.use(passport.initialize())
app.use(passport.session())

// SESSIONS

const sessions = require('./routes/sessionRouter.js')
app.use('/api/sessions', sessions)

// Validar sesion o uso de vistas sin restriccion
let urlValidation = {
  '/favicon.ico': true,
  '/info': true,
  '/logout': true,
  '/register': true,
  '/register-error': true,
  '/login-error': true,
  '/api/productos': true,
  '/main': true,
  '/graphQL': true,
}

app.use((req, res, next) => {
  if (req.session.passport && req.session.passport.user) res.cookie('userEmail', req.session?.passport.user)
  next()
  /*   if (req.session?.passport || urlValidation[req.originalUrl]) {
    
  } else {
    // LOGGER WARNING RUTA INCORRECTA
    if (req.url != '/login') serviceLoggerPino.routeNonExistWarn()
    res.sendFile(__dirname + `/public/login.html`)
  } */
})

const productos = require('./routes/productosRouter.js')
const testProductos = require('./routes/testRouter.js')
require('./controllers/chatController.js')
const randoms = require('./routes/randomRouter.js')
const info = require('./routes/infoRouter.js')

app.use('/api/productos', productos)
app.use('/api/productos-test', testProductos)
app.use('/api', randoms)
app.use('/', info)

// graphql

// GET
/* query{
  listarProductos{
    title
    price
    thumbnail
  }
} */
// POST
/* mutation {
  guardarProducto(datos:
    {
    title: "testGuardarGraphiQL", 
    price: "test123",
    thumbnail: "testurl.com.ar"
    }
  ) {
    title
    price
    thumbnail
  }
} */
// UPDATE
/* mutation {
  actualizarProducto(
    _id:"63e1af5abbc7e044a3de9af6",
    datos:
    {
    title: "ProbandoTestGraphiQL", 
    price: "9999GraphUpdate",
    thumbnail: "updateexitoso"
    }
  ) {
    _id
    title
    price
    thumbnail
  }
} */
// DELETE

const ProductoGQLSchema = require('./GraphQL/ProductoSchema.js')
const ProductoControllerGraphQL = require('./GraphQL/GraphQLController.js')

app.use(
  '/graphql',
  graphqlHTTP({
    schema: ProductoGQLSchema,
    rootValue: {
      listarProductos: ProductoControllerGraphQL.listarProductos,
      guardarProducto: ProductoControllerGraphQL.guardarProducto,
      actualizarProducto: ProductoControllerGraphQL.actualizarProducto,
      eliminarProducto: ProductoControllerGraphQL.eliminarProducto,
    },
    graphiql: true,
  })
)

app.get('/:file', (req, res) => {
  res.sendFile(__dirname + `/public/${req.params.file}.html`)
})

// Server up
httpServer.listen(PORT, () => console.log(`SERVER LISTENING IN PORT ${PORT}`))
