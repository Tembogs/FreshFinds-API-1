import express from "express";
import UserRouter from "./routes/users.routes.js";
import setupMiddlewares from "./middlewares/middlewares.js";
import ProductRouter from "./routes/product.routes.js"
import AuthRouter from "./routes/auth.routes.js"
import OrderRouter from "./routes/orders.routes.js"
// import { register, login } from "./controllers/auth.controllers.js"
const app = express();

setupMiddlewares(app);

app.use("/api/users", UserRouter);
app.use("/api/products", ProductRouter);
app.use("/api/auth", AuthRouter)
app.use("/api/orders", OrderRouter)
// app.post("/api/register", register)
// app.post("/api/login", login)

app.get("/", (req, res) => {
  res.send("Welcome to FreshFinds API");
});

export default app;
