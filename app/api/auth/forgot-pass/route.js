import { NextResponse } from "next/server";
import User from "../../../../database/schema/User";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../../../../utils/token";
import sendEmail from "../../../../utils/sendEmail";

const BASE_URL = process.env.NEXTAUTH_URL;

export async function POST(request) {
  try {
    const form = await request.formData();
    const { email } = Object.fromEntries(form.entries());
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ data: "user not found" }, { status: 404 });
    }
    if (user.provider === "google") {
      return NextResponse.json(
        { data: "You are using google account" },
        { status: 400 }
      );
    }

    const token = generateToken({ userId: user._id });

    await sendEmail(
      user.email,
      "Reset Password",
      `<a href="${BASE_URL}/authentication/reset-password?token=${token}">Reset Password</a>`
    );

    return NextResponse.json({ data: "user" }, { status: 200 });
  } catch (error) {
    console.log({ error });
    NextResponse.json({ data: error }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const pass = request.nextUrl.searchParams.get("password");
    const { token } = await request.json();
    const { userId } = await verifyToken(token);

    const hash = await bcrypt.hash(pass, 10);

    await User.findByIdAndUpdate(userId, { password: hash });

    return NextResponse.json({ data: "user" }, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ data: error }, { status: 400 });
  }
}
