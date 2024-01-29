import React from "react";

function Button({ onClick, text }) {
  return (
    <>
      <button className="bg-red-200 p-2 rounded-md" onClick={onClick}>
        {text}
      </button>
    </>
  );
}

export default Button;
