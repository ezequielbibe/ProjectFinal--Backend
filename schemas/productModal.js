import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productsSchema = new Schema({
  timeStamp: { type: String, required: true },
  prodName: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  photo: { type: String, required: true },
  stock: { type: Number, required: true },
});

const Products = model("Product", productsSchema);

export default Products;