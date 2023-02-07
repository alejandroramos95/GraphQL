const { buildSchema } = require('graphql')

const ProductoGQLSchema = buildSchema(`
    input ProductoInput {
        title: String,
        price: String,
        thumbnail: String
    }
    type Producto {
        _id: String,
        title: String,
        price: String,
        thumbnail: String
    }
    type Query {
      listarProductos: [Producto]
    }
    type Mutation {
      guardarProducto(datos: ProductoInput): Producto,
      eliminarProducto: [Producto]
    }
`)

module.exports = ProductoGQLSchema
