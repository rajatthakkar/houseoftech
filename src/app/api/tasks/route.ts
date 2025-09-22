import { NextResponse } from "next/server";
import createMongooseConection from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { Task } from "@/modal/task";

export async function POST(req: Request) {
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

    const body = await req.json();
    const { title, dueDate, description, priority, assignTo } = body;

    if (!title || !dueDate || !description || !priority || !assignTo) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Normalize priority to lowercase
    const normalizedPriority = priority.toLowerCase();
    if (!["low", "medium", "high"].includes(normalizedPriority)) {
      return NextResponse.json(
        { error: "Invalid priority value" },
        { status: 400 }
      );
    }

    const newTask = new Task({
      title,
      dueDate: new Date(dueDate),
      description,
      priority: normalizedPriority,
      assignTo,
      createdBy: decoded.id,
    });

    await newTask.save();

    return NextResponse.json(
      { message: "Task created successfully", task: newTask },
      { status: 201 }
    );
  } catch (err) {
    console.error("Task creation error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
export async function GET(req: Request) {
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

    const tasks = await Task.find({ createdBy: decoded.id }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (err) {
    console.error("Get tasks error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
export async function PATCH(req: Request) {
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

    const body = await req.json();
    const { _id, title, dueDate, description, priority, assignTo } = body;

    if (!_id) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    // Find the task and ensure it belongs to the user
    const task = await Task.findOne({ _id, createdBy: decoded.id });
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Update fields if provided
    if (title) task.title = title;
    if (dueDate) task.dueDate = new Date(dueDate);
    if (description) task.description = description;
    if (priority) {
      const normalizedPriority = priority.toLowerCase();
      if (!["low", "medium", "high"].includes(normalizedPriority)) {
        return NextResponse.json(
          { error: "Invalid priority value" },
          { status: 400 }
        );
      }
      task.priority = normalizedPriority;
    }
    if (assignTo) task.assignTo = assignTo;

    await task.save();

    return NextResponse.json(
      { message: "Task updated successfully", task },
      { status: 200 }
    );
  } catch (err) {
    console.error("Task update error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
