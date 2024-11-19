// src/components/Sidebar.js
import React from "react";

function Sidebar({ onSelectOption }) {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <h2 className="text-xl font-bold p-4">Shruti 2.0</h2>
      <button
        onClick={() => onSelectOption("newIdea")}
        className="p-4 hover:bg-gray-700"
      >
        New Idea
      </button>
      <button
        onClick={() => onSelectOption("idea")}
        className="p-4 hover:bg-gray-700"
      >
        Ideas
      </button>
    </div>
  );
}

export default Sidebar;
