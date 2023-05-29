import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ordersSchema = new Schema({
  idOrder: { type: Number, required: true },
  email: { type: String, required: true },
  timeStamp: { type: String, required: true },
  status: { type: String, required: true },
  products: { type: Array, required: true },
});

const Orders = model("Order", ordersSchema);

export default Orders;