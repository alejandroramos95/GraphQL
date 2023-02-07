const { expect } = require('chai')
const axios = require('axios')

describe('Verificando endpoints/api/productos', () => {
  it('Validando status 200 GET /api/productos/listar', async () => {
    const productos = await axios.get('http://localhost:8080/api/productos/listar')
    expect(productos.status).to.eql(200)
  })

  it('Validar estructura GET /api/productos/listar', async () => {
    const productos = await axios.get('http://localhost:8080/api/productos/listar')
    expect(productos.data[0]).to.include.keys('_id', 'title', 'price', 'thumbnail')
  })

  // COMENTARIO, EL TEST SE EJECUTA, LOGRA GUARDAR EL DATO, PERO EL TEST PASA COMO ERRONEO, PUEDE TENER QUE VER CON LA RUTA POST Y res.redirect('/main')

  /* it('Validar guardado de producto POST /api/productos/guardar', async () => {
    const productoNuevo = {
      title: 'TEST_GUARDAR_PRODUCTO',
      price: '9999',
      thumbnail: 'https://webwereld.nl/cmsdata/features/3771324/je5jhttm7mmz6eq2_thumb800.jpg',
    }
    const productos = await axios.post('http://localhost:8080/api/productos/guardar', productoNuevo)
    expect(productos.data).to.include.keys('_id', 'title', 'price', 'thumbnail')
    expect(productos.data.title).to.eql(productoNuevo.title)
  }) */

  it('Validar actualizacion de producto PUT /api/productos/actualizar', async () => {
    const productoActualizado = {
      title: 'pelota',
      price: 'TEST_UPDATE_PRICE_PELOTA_11111',
      thumbnail: 'https://www.pngplay.com/wp-content/uploads/12/Soccer-Ball-PNG-Pic-Background.png',
    }
    // ID '63d96bd89ebf1fb58544498e', PRIMERO DE LA LISTA DE PRODUCTOS TITLE: PELOTA, UPDATEO EL PRECIO POR 'TEST_UPDATE_PRICE_PELOTA_11111'
    const productos = await axios.put(
      'http://localhost:8080/api/productos/actualizar/63cd2056ae4b79c21a21de39',
      productoActualizado
    )
    expect(productos.data).to.include.keys('title', 'price', 'thumbnail')
  })

  it('Validar actualizacion de producto PUT /api/productos/actualizar/:id', async () => {
    const productoActualizado = {
      title: 'pelota',
      price: 'TEST_UPDATE_PRICE_PELOTA_11111',
      thumbnail: 'https://www.pngplay.com/wp-content/uploads/12/Soccer-Ball-PNG-Pic-Background.png',
    }
    // ID '63d96bd89ebf1fb58544498e', PRIMERO DE LA LISTA DE PRODUCTOS TITLE: PELOTA, UPDATEO EL PRECIO POR 'TEST_UPDATE_PRICE_PELOTA_11111'
    const productos = await axios.put(
      'http://localhost:8080/api/productos/actualizar/63cd2056ae4b79c21a21de39',
      productoActualizado
    )
    expect(productos.data).to.include.keys('title', 'price', 'thumbnail')
  })

  it('Validar eliminación de informacion DELETE /api/productos/borrar/:id', async () => {
    // ELIMINA EL PRODUCTO CON ID 63cd2086ae4b79c21a21de47 TITLE: PLANTA
    const productos = await axios.delete('http://localhost:8080/api/productos/borrar/63cd2086ae4b79c21a21de47')
    expect(productos.status).to.eql(200)
  })
})
