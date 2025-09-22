"use client";

import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../lib/axious";
import { useRouter } from "next/navigation";

const validateTaskForm = (values: {
  title: string;
  dueDate: string;
  description: string;
  priority: string;
  assignee: string;
}) => {
  const errors: Record<string, string> = {};

  if (!values.title.trim()) errors.title = "Title is required";
  else if (values.title.length < 3)
    errors.title = "Title must be at least 3 characters";

  if (!values.dueDate) errors.dueDate = "Due date is required";
  else if (new Date(values.dueDate) < new Date())
    errors.dueDate = "Due date cannot be in the past";

  if (!values.description.trim())
    errors.description = "Description is required";
  else if (values.description.length < 10)
    errors.description = "Description must be at least 10 characters";

  if (!["Low", "Medium", "High"].includes(values.priority))
    errors.priority = "Invalid priority selected";
  if (!values.assignee.trim()) errors.assignee = "Assignee is required";

  return errors;
};

const TaskDetailsForm = ({
  setLoading,
  tasksData,
  getAllTask,
  setUpdateTask,
}: any) => {
  const router = useRouter();
  const emptyValues = {
    title: "",
    dueDate: "",
    description: "",
    priority: "Low",
    assignee: "",
  };
  const [initialValues, setInitialValues] = useState(emptyValues);

  // Update form when tasksData changes (edit) or reset to blank (new)
  useEffect(() => {
    if (tasksData && tasksData._id) {
      setInitialValues({
        title: tasksData.title || "",
        dueDate: tasksData.dueDate ? tasksData.dueDate.slice(0, 10) : "",
        description: tasksData.description || "",
        priority: tasksData.priority
          ? tasksData.priority.charAt(0).toUpperCase() +
            tasksData.priority.slice(1)
          : "Low",
        assignee: tasksData.assignTo || "",
      });
    } else {
      setInitialValues(emptyValues); // reset to blank for new task
    }
  }, [tasksData]);

  const handleSubmit = async (values: any, resetForm: Function) => {
    setLoading(true);
    try {
      const payload = {
        ...(tasksData?._id && { _id: tasksData._id }),
        title: values.title,
        dueDate: values.dueDate,
        description: values.description,
        priority: values.priority,
        assignTo: values.assignee,
      };

      let res;
      if (tasksData?._id) {
        res = await api.patch("/tasks", payload); // update
      } else {
        res = await api.post("/tasks", payload); // create
      }

      toast.success(res.data.message);
      getAllTask();
      resetForm(); // clear form after submit
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Task failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg shadow-md bg-white p-6">
      <h2 className="text-xl font-bold mb-4">Task Details</h2>

      <Formik
        initialValues={initialValues}
        validate={validateTaskForm}
        enableReinitialize
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm,
        }) => (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
              <label className="block font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && touched.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Due Date */}
            <div>
              <label className="block font-medium mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={values.dueDate}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.dueDate && touched.dueDate && (
                <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                name="description"
                rows={3}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description && touched.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Priority */}
            <div>
              <label className="block font-medium mb-1">Priority</label>
              <select
                name="priority"
                value={values.priority}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              {errors.priority && touched.priority && (
                <p className="text-red-500 text-sm mt-1">{errors.priority}</p>
              )}
            </div>

            {/* Assignee */}
            <div>
              <label className="block font-medium mb-1">Assign To</label>
              <input
                type="text"
                name="assignee"
                value={values.assignee}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.assignee && touched.assignee && (
                <p className="text-red-500 text-sm mt-1">{errors.assignee}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-auto">
              <button
                type="button"
                className="px-4 py-2 rounded-md border hover:bg-gray-100"
                onClick={() => {
                  resetForm({ values: emptyValues });
                  setUpdateTask({});
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default TaskDetailsForm;
