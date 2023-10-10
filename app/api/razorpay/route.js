import User from "../../../database/schema/User";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

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
    const { orderDetails } = data;

    if (!orderDetails) {
      return NextResponse.json(
        { error: "Please add all the fields" },
        { status: 400 }
      );
    }

    const total = user.cart.total;
    console.log(orderDetails.total, total);
    if (orderDetails.total !== total) {
      return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
    }

    let order = await razorpay.orders.create({
      amount: total * 100,
      currency: "INR",
      receipt: shortid.generate(),
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
