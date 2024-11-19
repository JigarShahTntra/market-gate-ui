// src/components/NewIdea.js
import React, { useState } from "react";
import axios from "axios";

function NewIdea() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/ideas",
        {
          title,
          description,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      alert("Idea submitted successfully!");
      setTitle("");
      setDescription("");
    } catch (error) {
      setError("Failed to submit idea");
    }
  };

  return (
    <div className="h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          New Idea
        </h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border rounded"
              required
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white p-3 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewIdea;
