const ProductoMongo = require('./Productos.js')
const ProductoFS = require('./ProductosFileSystem.js')

module.exports = class MyConnectionFactory {
  returnDBConnection() {
    if (process.env.STORE == 'MONGO') return ProductoMongo.returnSingleton()
    if (process.env.STORE == 'FS') return ProductoFS.returnSingleton()
  }
}
