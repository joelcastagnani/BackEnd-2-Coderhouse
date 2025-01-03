const { Router } = require("express");
const { ProductController } = require("../../controllers/products.controller.js");

const router = Router();

const {
  getProduct,
  getProducts,
  createProducts,
  updateProducts,
  deleteProduct,
} = new ProductController();

router.get("/", getProducts);
router.get("/:pid", getProduct);
router.post("/", createProducts);
router.put("/:pid", updateProducts);
router.delete("/:pid", deleteProduct);

module.exports = router;
