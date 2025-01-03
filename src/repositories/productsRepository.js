const Product = require('../daos/models/productModel.js');
const ProductRepository = require('../repositories/productsRepository.js');
const ProductDaoMongo = require('../daos/MONGO/productsDao.mongo.js');

class productRepository {
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
      console.error('Error al crear producto: (productRepository)', error);
      throw error;
    }
  }
  deleteProduct = (pid) => this.dao.delete(pid);
}

module.exports = productRepository;
