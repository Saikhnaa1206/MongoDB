const express = require("express");
const userRouter = require("./routes/userRouter");
const app = express();
app.use(express.json());
const PORT = 8080;
app.use("/user", userRouter);
app.listen(PORT, console.log(`Your server is running in ${PORT}`));
