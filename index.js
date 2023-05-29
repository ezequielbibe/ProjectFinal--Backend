import { PORT, MONGO_LOCAL, PRIVATE_KEY } from "./config/environment.js";
import { logger } from "./logs/winston.js";
import express from "express";
import connectToMongoDB from "./config/connectToDbMongo.js";
import mongoStore from "connect-mongo";
import {
  usersRouter,
  productsRouter,
  cartsRouter,
  ordersRouter,
  configRouter,
} from "./router/index.js";
import expressSession from "express-session";
import passport from "passport";
import { engine } from "express-handlebars";
import "./helpers/passport/passport.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    store: mongoStore.create({
      mongoUrl: MONGO_LOCAL,
      ttl: 6000,
      autoRemove: "interval",
      autoRemoveInterval: 0,
    }),
    resave: false,
    saveUninitialized: false,
    secret: PRIVATE_KEY,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/carts", cartsRouter);
app.use("/orders", ordersRouter);
app.use("/config", configRouter);

app.listen(PORT, async () => {
  try {
    await connectToMongoDB();
    logger.info(`Listening on port: ${PORT}, process ${process.pid}`);
  } catch (error) {
    logger.warn(`We has problems: ${error.message}`);
  }
});