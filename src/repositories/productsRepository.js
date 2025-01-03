const Product = require('../daos/models/productModel.js');

class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getProducts = () => this.dao.get();
  getProduct = (filter) => this.dao.getBy(filter);
  async createProducts(productData) {
    try {
      const newProduct = await this.dao.create(productData);
      return newProduct;
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }
  }
  //createProducts = (newProduct) => this.dao.getBy(newProduct);
  deleteProduct = (pid) => this.dao.delete(pid);
}

module.exports = ProductRepository;
