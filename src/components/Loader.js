// src/components/Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div style={{ textAlign: "center", margin: "2rem" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
