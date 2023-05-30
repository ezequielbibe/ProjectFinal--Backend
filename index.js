import {
  PORT,
  MONGO_LOCAL,
  PRIVATE_KEY,
  SESSION_TIME,
  MONGO_ATLAS,
  NODE_ENV,
} from "./config/environment.js";
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
  chatRouter,
} from "./router/index.js";
import expressSession from "express-session";
import passport from "passport";
import { engine } from "express-handlebars";
import { socket } from "./socket/socket.js";
import { Server } from "socket.io";
import { createServer } from "http";
import "./helpers/passport/passport.js";

const app = express();
const server = createServer(app);
export const io = new Server(server);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    store: mongoStore.create({
      mongoUrl: NODE_ENV === "PROD" ? MONGO_ATLAS : MONGO_LOCAL,
      ttl: SESSION_TIME,
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
app.use(express.static("public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/carts", cartsRouter);
app.use("/orders", ordersRouter);
app.use("/chat", chatRouter);
app.use("/config", configRouter);

io.on("connection", socket);

server.listen(PORT, async () => {
  try {
    await connectToMongoDB();
    logger.info(`Listening on port: ${PORT}, process ${process.pid}`);
  } catch (error) {
    logger.warn(`We has problems: ${error.message}`);
  }
});