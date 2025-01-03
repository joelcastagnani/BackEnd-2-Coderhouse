const { productModel } = require("../models/productModel");

class ProductDaoMongo {
  constructor() {
    this.model = productModel;
  }

  get = async () => {
    return await this.model.find();
  };
  getBy = async (filter) => {
    return await this.model.findOne(filter).lean();
  };
  update = async(pid, updateProduct) => {
    return await this.model.findByIdAndUpdate({ _id: pid }, updateProduct, {
      new: true,
    });
  }
  create = async (newProduct) => {
    return await this.model.create(newProduct);
  }
  delete = async(pid) => {
    return await this.model.findByIdAndUpdate(
      { _id: pid },
      { isActive: false },
      { new: true }
    );
  }
}

module.exports = ProductDaoMongo;
