const { Router } = require("express");

const userRouter = require("./api/userRouter.js");
const sessionsRouter = require("./api/sessionsRouter.js");
const pruebasRouter = require("./api/pruebasRouter.js");
const viewsRouter = require("./viewsRouter.js");
const productsRouter = require("./api/productsRouter.js");


const router = Router();

router.use("/api/sessions/", sessionsRouter);
router.use("/", viewsRouter);
router.use("/api/users", userRouter);
router.use("/api/products", productsRouter);
router.use("/pruebas", pruebasRouter);

module.exports = router;