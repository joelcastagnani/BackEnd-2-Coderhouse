const { productService } = require("../services/index.js");

class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  getProducts = async (req, res) => {
    try {
      const products = await productService.getProducts();
      res.send({ status: "success", data: products });
    } catch (error) {
      console.log(error);
    }
  };
  getProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await productService.getProduct(pid);
      res.send({ status: "success", data: product });
    } catch (error) {
      console.log(error);
    }
  };
  createProducts = async (req, res) => {
    try {
      const { body } = req;
      console.log("Cuerpo recibido:", body);
  
      if (!body.title) {
        return res
          .status(400)
          .send({ status: "error", message: "Title is required" });
      }
  
      const result = await productService.createProducts(body);
      res.send({ status: "success", data: result });
    } catch (error) {
      console.log("Error al crear producto:", error);
      res
        .status(500)
        .send({ status: "error", message: "Failed to create product" });
    }
  };
  updateProducts = async (req, res) => {
    res.send("estas en update product");
  };
  deleteProduct = async (req, res) => {
    res.send("estas en delete product");
  };

}

module.exports = { ProductController };
