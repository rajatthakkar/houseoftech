import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import createMongooseConection from "@/lib/db";
import User from "@/modal/user";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await createMongooseConection();
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    // Create JWT
    const token = signToken({ id: user._id, email: user.email });
    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
