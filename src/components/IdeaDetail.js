// src/components/IdeaDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdownPreview from "@uiw/react-markdown-preview";
import EChartsReact from "echarts-for-react";

function IdeaDetail() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [criterias, setCriterias] = useState([]);
  const [selectedCriteria, setSelectedCriteria] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [selectedMitigation, setSelectedMitigation] = useState(null);

  useEffect(() => {
    // Fetch idea details
    axios
      .get(`http://localhost:3000/ideas/${id}`)
      .then((response) => setIdea(response.data))
      .catch((error) => console.error("Error fetching idea:", error));

    // Fetch criteria buttons
    axios
      .get(`http://localhost:3000/ideas/${id}/criterias/fetch_criterias`)
      .then((response) => setCriterias(response.data))
      .catch((error) => console.error("Error fetching criterias:", error));
  }, [id]);

  const convertToTitleCase = (str) => {
    return str
      .split("_") // Split the string at underscores
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(" "); // Join the words back together with spaces
  };

  // Function to handle criteria button click
  const handleCriteriaClick = async (criteriaType) => {
    try {
      const criteriaResponse = await axios.get(
        `http://localhost:3000/ideas/${id}/criterias/${criteriaType}/show`
      );
      setSelectedCriteria(criteriaResponse.data);

      const graphResponse = await axios.get(
        `http://localhost:3000/ideas/${id}/criterias/${criteriaType}/graphs`
      );
      setGraphData(graphResponse.data); // Assuming `graph_parameters` is an array of data points

      const mitigationResponse = await axios.get(
        `http://localhost:3000/ideas/${id}/criteria_mitigations/${criteriaType}/show`
      );
      setSelectedMitigation(mitigationResponse.data);
    } catch (error) {
      console.error("Error fetching criteria details or graph:", error);
    }
  };

  // Function to get chart options for ECharts
  const getChartOptions = (data) => {
    console.log(JSON.parse(data), "data");
    return JSON.parse(data);
  };

  return (
    <div className="p-8 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-4">Idea Detail</h1>
      {idea && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">{idea.title}</h2>
          <ReactMarkdownPreview
            source={idea.ellaboration}
          ></ReactMarkdownPreview>
        </div>
      )}
      <h3 className="text-xl font-semibold mt-8 mb-4">Criterias</h3>
      <div className="flex space-x-4 mb-4">
        {criterias.map((criteria) => (
          <button
            key={criteria}
            onClick={() => handleCriteriaClick(criteria)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            {convertToTitleCase(criteria)}
          </button>
        ))}
      </div>
      {selectedCriteria && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Criteria Description</h3>
          <ReactMarkdownPreview
            source={selectedCriteria.description}
          ></ReactMarkdownPreview>
        </div>
      )}
      {graphData && graphData.graph_parameters && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Criteria Graph</h3>

          <EChartsReact
            option={getChartOptions(graphData.graph_parameters)}
            style={{ height: "400px", width: "100%" }}
          />
          {/* {console.log(graphData.description, "{graphData.description}")}
          <ReactMarkdownPreview
            source={graphData.description}
          ></ReactMarkdownPreview> */}
        </div>
      )}
      <h3 className="text-xl font-semibold mt-8 mb-4">Mitigation Assessment</h3>
      {selectedMitigation && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Criteria Description</h3>
          <ReactMarkdownPreview
            source={selectedMitigation.description}
          ></ReactMarkdownPreview>
        </div>
      )}
    </div>
  );
}

export default IdeaDetail;
