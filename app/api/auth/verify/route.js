import { NextResponse } from "next/server";
import { verifyToken } from "../../../../utils/token";
import User from "../../../../database/schema/User";

export async function POST(request) {
  try {
    const { token } = await request.json();

    const user = verifyToken(token);
    const userExist = await User.findOne({ email: user.email });
    if (userExist)
      return NextResponse.json(
        { message: "Verification successful" },
        { status: 200 }
      );

    const newUser = new User(user);
    await newUser.save();

    return NextResponse.json(
      { message: "Verification successful" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
