import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "../../../../database/schema/User";
import { authOption } from "../[...nextauth]/route";

export async function POST(request) {
  try {
    const session = await getServerSession(authOption);
    if (!session) throw new Error("Unauthorized");

    const form = await request.formData();
    const userData = Object.fromEntries(form.entries());

    const user = await User.findByIdAndUpdate(session.user._id, userData);

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    console.log(error);
    NextResponse.json({ message: error }, { status: 400 });
  }
}
