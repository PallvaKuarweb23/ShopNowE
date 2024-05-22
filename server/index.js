const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./Router/user.route");
const { mensRouter } = require("./Router/mens.route");
const { cartRouter } = require("./Router/cart.route");
const { paymentrouter } = require("./Router/payment.route");
const { orderRouter } = require("./Router/order.route");
const { womensRouter } = require("./Router/women.route");
const { kidsRouter } = require("./Router/kids.route");
require("dotenv").config();
// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:4200", "http://your-angular-app.com"],
  })
);
app.use(cors());
app.use(express.json());
// app.use("/", (req, res) => {
//   res.json({ msg: "hello I am shopnow server" });
// });

// userRoute
app.use("/user", userRouter);
app.use("/mens", mensRouter);
app.use("/cart", cartRouter);
// app.use("/payment", paymentrouter);
app.use("/order", orderRouter);
app.use("/women", womensRouter);
app.use("/kid", kidsRouter);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db at port 3000 ");
  } catch (error) {
    console.log(error);
    console.log("Not connected to db");
  }
});
