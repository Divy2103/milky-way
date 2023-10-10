import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: Number,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
});

export default mongoose.models.Payment ||
  mongoose.model("Payment", paymentSchema);
