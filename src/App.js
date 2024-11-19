// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard"; // Import Dashboard component
import Ideas from "./components/Ideas"; // Import Ideas page
import IdeaDetail from "./components/IdeaDetail"; // Import IdeaDetail page
import NewIdea from "./components/NewIdea"; // Import NewIdea page

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/ideas/:id" element={<IdeaDetail />} />
          <Route path="/new-idea" element={<NewIdea />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
