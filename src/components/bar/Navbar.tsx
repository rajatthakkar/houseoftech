"use client";
import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import api from "../../lib/axious";
import { Button } from "@mui/material";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await api.post("/logout"); // optional API call

      // Remove token from localStorage
      localStorage.removeItem("token");

      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err) {
      toast.error("Logout failed");
      console.error(err);
    }
  };
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Task Manager</h1>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-6">
        <li>
          <a
            href="/"
            className="hover:text-blue-600"
            onClick={() => {
              handleLogout;
              setMenuOpen(false);
            }}
          >
            Log Out
          </a>
        </li>
      </ul>

      {/* Hamburger Button for Mobile */}
      <button
        className="md:hidden p-2 rounded shadow-md"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 w-40 bg-black text-white rounded shadow-lg flex flex-col">
          <a
            className="px-4 py-2 hover:bg-gray-700"
            onClick={() => {
              handleLogout;
              setMenuOpen(false);
            }}
          >
            Log Out
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
