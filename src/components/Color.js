import React from "react";

export default function Color({ color }) {
  return (
    <div
      className="color-element"
      style={{
        background: color || "white",
      }}
    ></div>
  );
}
