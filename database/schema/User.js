import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  email: {
    type: String,
    unique: true,
  },
  phone: String,
  address: String,
  country: String,
  state: String,
  city: String,
  zipCode: String,
  provider: String,
  password: String,
  image: String,
  role: {
    type: String,
    default: "user",
  },
  cart: {
    type: {
      items: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: Number,
        },
      ],
      mrp: Number,
      total: Number,
    },
    default: {
      items: [],
      total: 0,
      mrp: 0,
    },
  },
  order: {
    type: [
      {
        orderId: {
          type: Schema.Types.ObjectId,
          ref: "Order",
        },
      },
    ],
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
