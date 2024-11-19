// src/components/Dashboard.js
import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>

        <div className="space-y-4">
          <Link to="/new-idea" className="block text-blue-400 hover:text-white">
            New Idea
          </Link>
          <Link to="/ideas" className="block text-blue-400 hover:text-white">
            Ideas
          </Link>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-8 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome to the Dashboard!
        </h2>
        {/* Add additional content here if needed */}
      </div>
    </div>
  );
}

export default Dashboard;
