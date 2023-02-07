const FakeProducts = require('../services/FakeProducts.js')
const fakeProducts = new FakeProducts()

// TEST, faker product generator
function testFaker(req, res) {
  res.json(fakeProducts.generarProducto(5))
}

module.exports = { testFaker }
