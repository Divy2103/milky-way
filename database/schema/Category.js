import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  description: String,
});

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
