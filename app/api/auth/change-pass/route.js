import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "../../../../database/schema/User";
import { authOption } from "../[...nextauth]/route";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const session = await getServerSession(authOption);
    if (!session) throw new Error("Unauthorized");

    if (session.user.provider === "google") {
      return NextResponse.json(
        {
          data: `This account is signed in with ${session.user.provider} and cannot be updated with a password.`,
        },
        { status: 401 }
      );
    }

    const form = await request.formData();
    const { oldPassword, newPassword } = Object.fromEntries(form.entries());
    const user = await User.findOne({ email: session.user.email });

    const compare = await bcrypt.compare(oldPassword, user.password);
    if (!compare) {
      return NextResponse.json(
        { data: "Old password is incorrect" },
        { status: 401 }
      );
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 12);

    await User.findByIdAndUpdate(user._id, {
      password: newHashedPassword,
    });

    return NextResponse.json({ data: "user" }, { status: 200 });
  } catch (error) {
    console.log({ error });
    NextResponse.json({ data: error }, { status: 400 });
  }
}
