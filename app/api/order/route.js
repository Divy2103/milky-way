import Orders from "../../../database/schema/Orders";
import Payment from "../../../database/schema/Payment";
import User from "../../../database/schema/User";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_KEY,
});

export async function POST(request, response) {
  try {
    const userId = request.nextUrl.searchParams.get("id");

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const data = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      order,
    } = data;

    const validatePayment = await razorpay.payments.fetch(razorpay_payment_id);
    if (!validatePayment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 400 });
    }

    if (validatePayment.status !== "captured") {
      return NextResponse.json(
        { error: "Payment not captured" },
        { status: 400 }
      );
    }

    console.log(user.email);

    const payment = new Payment({
      user: userId,
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    await payment.save();

    const newOrder = new Orders({
      products: order.products.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
      })),
      status: "pending",
      subTotal: order.total,
      email: user.email,
    });
    await newOrder.save();

    user.order.push(newOrder._id);
    user.cart = {
      products: [],
      mrp: 0,
      total: 0,
    };
    await user.save();

    return NextResponse.json({ message: "Order placed..." });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(request, response) {
  const data = await Orders.find().populate("products.productId");
  return NextResponse.json({ data });
}
