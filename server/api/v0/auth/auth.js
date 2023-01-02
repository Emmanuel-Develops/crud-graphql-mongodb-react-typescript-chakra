const { Router} = require("express");
const LoginRouter = require("./login");

const router = Router()

router.use("/", LoginRouter)

const Auth = router
module.exports = Auth