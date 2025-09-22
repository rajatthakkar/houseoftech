import { NextResponse } from "next/server";

export async function POST() {
  try {
    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
