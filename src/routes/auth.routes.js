const express = require("express");
const authRouter = express.Router();
const {protect} = require("../middlewares/protect.middleware");

const { login, logout, refresh,getMe } = require("../controllers/auth.controller");

authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/refresh", refresh);
authRouter.get("/me",protect,getMe);

module.exports = authRouter;
