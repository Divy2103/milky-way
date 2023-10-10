import { NextRequest, NextResponse } from "next/server";
import connect from "../../../database/connection";
import User from "../../../database/schema/User";
import Product from "../../../database/schema/Product";

connect();

export async function PUT(request, response) {
  try {
    const userId = request.nextUrl.searchParams.get("id");
    const data = await request.json();

    const { productId, quantity } = data;
    console.log(data);

    if (!productId || !quantity) {
      return NextResponse.json(
        { error: "Please add all the fields" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const cartItems = user.cart.items;
    let cartMrp = user.cart.mrp;
    let cartTotal = user.cart.total;

    const itemIndex = cartItems.findIndex((p) => p.productId == productId);

    if (itemIndex > -1) {
      const productItem = cartItems[itemIndex];
      productItem.quantity += quantity;
      cartItems[itemIndex] = productItem;
    } else {
      cartItems.push({
        productId,
        quantity: 1,
      });
    }

    const products = await Product.find({
      _id: { $in: cartItems.map((item) => item.productId) },
    });

    products.forEach((product) => {
      cartTotal += product.sellingPrice * quantity;
      cartMrp += product.mrp * quantity;
    });

    user.cart.items = cartItems;
    user.cart.total = cartTotal;
    user.cart.mrp = cartMrp;

    await User.findByIdAndUpdate(userId, user);

    return NextResponse.json({ message: "Cart updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, response) {
  try {
    const userId = request.nextUrl.searchParams.get("id");
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const data = await request.json();
    const { productId } = data;

    if (!productId) {
      return NextResponse.json(
        { error: "Please add all the fields" },
        { status: 400 }
      );
    }

    const cartItems = user.cart.items;

    const itemIndex = cartItems.findIndex((p) => p.productId == productId);

    if (itemIndex > -1) {
      cartItems.splice(itemIndex, 1);
    }
    console.log(cartItems);

    const products = await Product.find({
      _id: { $in: cartItems.map((item) => item.productId) },
    });

    let cartMrp = 0;
    let cartTotal = 0;

    products.forEach((product) => {
      console.log(product);
      cartTotal += product.sellingPrice * quantity;
      cartMrp += product.mrp * quantity;
    });

    user.cart.items = cartItems;
    user.cart.total = cartTotal;
    user.cart.mrp = cartMrp;

    await User.findByIdAndUpdate(userId, user);

    return NextResponse.json({ message: "Cart updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(request, response) {
  const userId = request.nextUrl.searchParams.get("id");

  const user = await User.findById(userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  const p = user.cart.items.map(async (item) => {
    const product = await Product.findById(item.productId);
    return {
      ...product._doc,
      quantity: item.quantity,
    };
  });

  const products = await Promise.all(p);

  const mrp = user.cart.mrp;
  const total = user.cart.total;

  return NextResponse.json({ products, mrp, total });
}
