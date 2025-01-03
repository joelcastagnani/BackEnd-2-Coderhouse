const { productModel } = require("../models/productModel");

class ProductDaoMongo {
  constructor() {
    this.productModel = productModel;
  }

  get = async () => {
    return await this.productModel.find();
  };
  getBy = async (filter) => {
    return await this.productModel.findOne(filter).lean();
  };
  update = async(pid, updateProduct) => {
    return await this.productModel.findByIdAndUpdate({ _id: pid }, updateProduct, {
      new: true,
    });
  }
  create = async (newProduct) => {
    return await this.productModel.create(newProduct);
  }
  delete = async(pid) => {
    return await this.productModel.findByIdAndUpdate(
      { _id: pid },
      { isActive: false },
      { new: true }
    );
  }
}

module.exports = ProductDaoMongo;
