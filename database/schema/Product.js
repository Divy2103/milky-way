import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  image: String,
  description: String,
  mrp: Number,
  sellingPrice: Number,
  quantity: Number,
  bulletPoints: [String],
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
