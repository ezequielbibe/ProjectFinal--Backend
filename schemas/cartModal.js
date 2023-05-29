import mongoose from "mongoose";

const { Schema, model } = mongoose;

const cartsSchema = new Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
  timeStamp: { type: String, required: true },
  products: { type: Array, required: true },
});

const Carts = model("Cart", cartsSchema);

export default Carts;