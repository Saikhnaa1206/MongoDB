const { signup, login, deleteUser } = require("../controller/function");
const {
  loginmiddle,
  deletemiddle,
  signupmiddle,
} = require("../controller/middleware");
const express = require("express");
const userRouter = express();
userRouter.post("/signup", signupmiddle, signup);
userRouter.post("/login", loginmiddle, login);
userRouter.delete("/delete", deletemiddle, deleteUser);
module.exports = userRouter;
