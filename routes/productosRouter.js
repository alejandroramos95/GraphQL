const { Router } = require('express')
const {
  listarProductos,
  listarProductoPorId,
  guardarProducto,
  actualizarProducto,
  eliminarProducto,
} = require('../controllers/productosController.js')
const router = Router()

router.get('/listar', listarProductos)
router.get('/listar/:id', listarProductoPorId)
router.post('/guardar', guardarProducto)
router.put('/actualizar/:id', actualizarProducto)
router.delete('/borrar/:id', eliminarProducto)

module.exports = router
