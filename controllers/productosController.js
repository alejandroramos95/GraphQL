const MyConnectionFactory = require('../persistence/DAOs/DaoFactory.js')
const io = require('../server.js')
const serviceLoggerPino = require('../services/LoggerPino.js')

const connection = new MyConnectionFactory()
const productos = connection.returnDBConnection()

async function listarProductos(req, res) {
  res.json(await productos.getAll())
}

async function listarProductoPorId(req, res) {
  let { id } = req.params
  if (await productos.getById(id)) {
    res.json(await productos.getById(id))
  } else {
    const error = `No existe el producto con ID ${id}`
    serviceLoggerPino.errorFound(error)
    res.json(error)
  }
}

function guardarProducto(req, res) {
  let producto = req.body
  productos.save(producto)
  refreshProducts()
  res.redirect('/main')
}

function actualizarProducto(req, res) {
  let { id } = req.params
  let producto = req.body
  productos.updateById(producto, id)
  refreshProducts()
  res.json(producto)
}

async function eliminarProducto(req, res) {
  let { id } = req.params
  let producto = await productos.deleteById(id)
  refreshProducts()
  res.json(producto)
}

// Refresh products
async function refreshProducts() {
  io.sockets.emit('lista-productos', await productos.getAll())
}

io.on('connection', async () => {
  io.sockets.emit('lista-productos', await productos.getAll())
})

module.exports = { listarProductos, listarProductoPorId, guardarProducto, actualizarProducto, eliminarProducto }
