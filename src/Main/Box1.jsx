import React from "react";
import { useState } from "react";

function Box1({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box box1">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}

export default Box1;
