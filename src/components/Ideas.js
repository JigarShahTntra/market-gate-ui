// src/components/Ideas.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { color } from "echarts";

function Ideas() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/ideas", {
          headers: {
            Accept: "application/json",
          },
        });
        setIdeas(response.data);
      } catch (error) {
        setError("Failed to fetch ideas");
      } finally {
        setLoading(false);
      }
    };
    fetchIdeas();
  }, []);

  return (
    <div className="h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Ideas
        </h2>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {ideas.map((idea) => (
                <tr key={idea.id}>
                  <td>
                    <Link to={`/ideas/${idea.id}`} className="text-blue-600">
                      {idea.title}
                    </Link>
                  </td>
                  <td>{idea.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Ideas;
