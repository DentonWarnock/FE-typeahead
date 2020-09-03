import React from "react";

export default function Color({ color }) {
  return (
    <div
      data-testid="test-color-el"
      className="color-element"
      style={{
        background: color || "white",
      }}
    ></div>
  );
}
