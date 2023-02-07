require('dotenv').config()
const mongoose = require('mongoose')
const ProductosModel = require('../models/ProductosModel.js')
const mongodbUrl = process.env.MONGODBATLAS

module.exports = class Productos {
  constructor() {
    this.url = mongodbUrl
    this.mongodb = mongoose.connect
  }

  async conectarDB() {
    await this.mongodb(this.url)
  }

  async getAll() {
    await this.conectarDB()
    const dataProductos = await ProductosModel.find({}, { __v: false })
    return dataProductos
  }

  async save(obj) {
    await this.conectarDB()
    const nuevoProd = new ProductosModel(obj)
    return await nuevoProd.save()
  }

  async getById(id) {
    await this.conectarDB()
    const producto = await ProductosModel.findById(id)
    return producto
  }

  async deleteById(id) {
    await this.conectarDB()
    await ProductosModel.findByIdAndDelete(id)
  }

  async updateById(prod, id) {
    try {
      await this.conectarDB()
      await ProductosModel.findByIdAndUpdate(id, prod)
    } catch (e) {
      console.log('Error actualizar: ', e)
    }
  }

  static returnSingleton() {
    if (!this.instance) {
      this.instance = new Productos()
    }
    return this.instance
  }
}
