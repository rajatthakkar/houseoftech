"use client";
import React, { useEffect, useState } from "react";
import TaskDetailsForm from "@/pages/taskdetailsform";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import api from "../../lib/axious";
import { toast } from "react-toastify";
const Page = () => {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tasksData, setTasksData] = useState([]);
  const [updateTask, setUpdateTask] = useState();
  const router = useRouter();
  const getAllTask = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await api.get("/tasks");
      if (res.status === 200) {
        setTasksData(res.data.tasks);
        setMessage(res.data.message || "Task created successfully!");
        console.log("Task created:", res.data.task);
      } else {
        setError(res.data.error || "Failed to create task");
      }
    } catch (err: any) {
      console.error("Task creation error:", err);
      // Handle network errors or server errors
      setError(err.response?.data?.error || "Server error");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    setLoading(true);
    try {
      const res = await api.delete(`/tasks/${taskId}`);
      if (res.status === 200) {
        toast.success(res.data.message);
        getAllTask(); // Refresh the task list
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to delete task");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllTask();
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);
  return (
    <div className="w-screen flex">
      {loading ? (
        <div className="flex items-center justify-center h-full w-full">
          <CircularProgress size={60} />
        </div>
      ) : (
        <>
          {/* Left Section (60%) */}
          <div className="w-3/5 p-6 border-r">
            {/* Search Section */}

            <div>
              <table className="w-full border border-gray-300 rounded-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2 text-left">Title</th>
                    <th className="border px-4 py-2 text-left">Due Date</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasksData.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4">
                        No tasks found
                      </td>
                    </tr>
                  ) : (
                    tasksData &&
                    tasksData.length > 0 &&
                    tasksData.map((task: any) => (
                      <tr key={task?._id}>
                        <td className="border px-4 py-2">{task?.title}</td>
                        <td className="border px-4 py-2">
                          {new Date(task?.dueDate).toLocaleDateString()}
                        </td>
                        <td className="border px-4 py-2">{task?.priority}</td>
                        <td className="border px-4 py-2 text-center flex justify-center gap-2">
                          <button
                            className="px-3 py-1 bg-yellow-400 rounded-md hover:bg-yellow-500"
                            onClick={() => setUpdateTask(task)}
                          >
                            Edit
                          </button>
                          <button
                            className="px-3 py-1 bg-red-500 rounded-md hover:bg-red-600 text-white"
                            onClick={() => handleDeleteTask(task._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Section (40%) */}
          <div className="w-2/5 flex justify-center">
            <TaskDetailsForm
              setLoading={setLoading}
              tasksData={updateTask}
              getAllTask={getAllTask}
              setUpdateTask={setUpdateTask}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
