// src/components/Message.jsx
import React from "react";

const Message = ({ variant = "info", children }) => {
  const color =
    variant === "success"
      ? "green"
      : variant === "danger"
      ? "red"
      : "blue";
  return (
    <div
      style={{
        padding: "1rem",
        margin: "1rem 0",
        border: `1px solid ${color}`,
        color: color,
        borderRadius: "5px",
      }}
    >
      {children}
    </div>
  );
};

export default Message;
