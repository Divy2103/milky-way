import { NextResponse } from "next/server";
import User from "../../../../database/schema/User";
import bcrypt from "bcrypt";
import { generateToken } from "../../../../utils/token";
import sendEmail from "../../../../utils/sendEmail";

const BASE_URL = process.env.NEXTAUTH_URL;

export async function POST(request) {
  try {
    const form = await request.formData();
    let userData = Object.fromEntries(form.entries());

    const user = await User.findOne({ email: userData.email });
    if (user) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: 400 }
      );
    }

    if (userData.password !== userData.confirmPassword)
      throw new Error("Password not match");

    userData.role = "user";
    userData.password = await bcrypt.hash(userData.password, 12);
    delete userData.confirmPassword;

    const token = generateToken(userData);

    await sendEmail(
      userData.email,
      "Please verify your email",
      `${BASE_URL}/verify?token=${token}`
    );

    return NextResponse.json(
      { message: "SignUp successful verify email to continue" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    NextResponse.json({ message: error }, { status: 500 });
  }
}
