// import { NextResponse } from "next/server";
// import createMongooseConection from "@/lib/db";
// import { verifyToken } from "@/lib/auth";
// import { Task } from "@/modal/task";
// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await createMongooseConection();

//     const authHeader = req.headers.get("authorization");
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const token = authHeader.split(" ")[1];
//     let decoded: any;
//     try {
//       decoded = verifyToken(token);
//     } catch (err) {
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }

//     const taskId = params.id;
//     if (!taskId) {
//       return NextResponse.json(
//         { error: "Task ID is required" },
//         { status: 400 }
//       );
//     }

//     const deletedTask = await Task.findOneAndDelete({
//       _id: taskId,
//       createdBy: decoded.id,
//     });

//     if (!deletedTask) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     return NextResponse.json(
//       { message: "Task deleted successfully" },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("Delete task error:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import createMongooseConection from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { Task } from "@/modal/task";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await createMongooseConection();

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    let decoded: any;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const taskId = context.params.id; // 👈 यहाँ change
    if (!taskId) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    const deletedTask = await Task.findOneAndDelete({
      _id: taskId,
      createdBy: decoded.id,
    });

    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Delete task error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
