import React from "react";

const TaskCard: React.FC = ({ data }: any) => {
  const userData = {
    title: "Write Report",
    description: "Prepare quarterly financial report",
    priority: "High",
    assignee: "John Doe",
    date: "2024-05-01",
  };

  const firstLetter = userData.assignee.charAt(0).toUpperCase();

  return (
    <div className="border-2 border-gray-700 rounded-xl p-4 m-2 shadow-sm flex flex-col gap-2">
      {/* Title */}
      <h2 className="text-lg font-semibold">{userData.title}</h2>

      {/* Date + Avatar Row */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{userData.date}</p>
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-black font-bold">{firstLetter}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-800">{userData.description}</p>

      {/* Priority */}
      <p className="text-sm font-medium text-gray-500">
        Priority: {userData.priority}
      </p>
    </div>
  );
};

export default TaskCard;
