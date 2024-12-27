const { Router } = require("express");
const userRouter = require('./api/userRouter.js');
const sessionRouter = require('./api/sessionsRouter.js');
const viewsRouter = require('./viewsRouter.js');


const router = Router();

router.use("/api/sessions/", sessionRouter);
router.use("/", viewsRouter);
router.use("/api/users", userRouter);

module.exports = router;