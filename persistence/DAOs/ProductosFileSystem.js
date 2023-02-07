require('dotenv').config()
const fs = require('fs')

module.exports = class Productos {
  constructor() {}

  async getAll() {
    let file = []
    try {
      const tempFile = await fs.promises.readFile('productos.txt', 'utf-8')

      if (tempFile) file = JSON.parse(tempFile)
    } catch (e) {}
    return file
  }

  async guardoProductoEnArchivo(producto) {
    const data = JSON.stringify(producto)
    await fs.promises.writeFile('productos.txt', data, 'utf-8')
  }

  async save(prodNuevo) {
    const array = await this.getAll()
    prodNuevo.timeStamp = Date.now()
    if (array.length) {
      const arrayAOrdenar = [...array]
      const indice = arrayAOrdenar.sort((a, b) => b.id - a.id)[0].id
      prodNuevo.id = indice + 1
    } else {
      prodNuevo.id = 1
    }
    array.push(prodNuevo)
    await this.guardoProductoEnArchivo(array)
    return prodNuevo
  }

  async getById(id) {
    const array = await this.getAll()
    let producto = array.find((prod) => prod.id === parseInt(id))
    return producto
  }

  async deleteById(id) {
    const array = await this.getAll()
    let index = array.findIndex((prod) => prod.id === parseInt(id))
    array.splice(index, 1)
    await this.guardoProductoEnArchivo(array)
  }

  async updateById(prod, id) {
    const array = await this.getAll()
    prod.id = Number(id)
    let index = array.findIndex((prod) => prod.id === parseInt(id))
    console.log('index :', index)
    if (index >= 0) {
      array.splice(index, 1, prod)
      await this.guardoProductoEnArchivo(array)
    }
  }

  static returnSingleton() {
    if (!this.instance) {
      this.instance = new Productos()
    }
    return this.instance
  }
}
