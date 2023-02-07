const MyConnectionFactory = require('../persistence/DAOs/DaoFactory.js')
const io = require('../server.js')

const connection = new MyConnectionFactory()
const productos = connection.returnDBConnection()

async function listarProductos(req, res) {
  const datos = await productos.getAll()
  return datos
}

function guardarProducto(req, res) {
  let producto = JSON.parse(JSON.stringify(req))
  producto = { title: producto.datos.title, price: producto.datos.price, thumbnail: producto.datos.thumbnail }
  productos.save(producto)
  return producto
}

function actualizarProducto(req, res) {
  let { id } = req.params
  let datos = req.body
  productos.updateById(datos, id)
  return datos
}

async function eliminarProducto(req, res) {
  let { id } = req.params
  let datos = await productos.deleteById(id)
  return datos
}

// Refresh products
async function refreshProducts() {
  io.sockets.emit('lista-productos', await productos.getAll())
}

io.on('connection', async () => {
  io.sockets.emit('lista-productos', await productos.getAll())
})

module.exports = { listarProductos, guardarProducto, actualizarProducto, eliminarProducto }
