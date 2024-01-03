import React from "react";
import { useState } from "react";

function Box2({ children }) {
  const [isOpen2, setIsOpen2] = useState(true);
  return (
    <div className="box box2">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && children}
    </div>
  );
}

export default Box2;
