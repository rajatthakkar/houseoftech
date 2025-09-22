// src/app/api/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import createMongooseConection from "@/lib/db";
import User from "@/modal/user";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }
    await createMongooseConection();
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (err) {
    console.error("API /api/signup error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
