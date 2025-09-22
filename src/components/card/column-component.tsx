"use client";
import React from "react";
import TaskCard from "./task-card";
import { Box, Typography, TextField } from "@mui/material";
const filteredItems = [1, 2, 4, 5];
const ColumnComponent: React.FC = ({}) => {
  return (
    <div
      className="w-full sm:w-[30%] h-[87vh] bg-primary border-[5px] border-borderLight text-textDark rounded-[1rem] p-4"
      style={{ padding: "0.8rem", borderRadius: "1rem" }}
    >
      <Box
        sx={{
          width: "100%",
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          height: "15vh",
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          To Do
        </Typography>
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search..."
          value={""}
          onChange={() => {}}
          sx={{
            backgroundColor: "white",
            borderRadius: "0.5rem",
          }}
        />
      </Box>
      <Box className="flex-1 overflow-y-auto max-h-[65vh] p-2">
        {filteredItems &&
          filteredItems.length > 0 &&
          filteredItems.map((data: any, index: any) => {
            return <TaskCard key={index} />;
          })}
      </Box>
    </div>
  );
};

export default ColumnComponent;
