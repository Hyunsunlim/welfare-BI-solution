import React from "react";
import Oneofthree from "./3中1/oneofthree";

function Part2({ selectedOption }) {
  return (
    <div className=" w-full h-full overflow-x-hidden p-2 ">
      {selectedOption === "3中1" ? (
        // Render content when selectedOption is "3中1"
        <div className=" h-full w-full p-2 rounded-md bg-white shadow-lg hover:shadow-slate-400 transition duration-300 ease-in-out">
          <Oneofthree />
        </div>
      ) : selectedOption === "Hospital" ? (
        // Render different content when selectedOption is "birthday"
        <div className=" h-full w-full p-2 ">
          <div className="rounded-md bg-white h-full flex items-center justify-center shadow-lg">
            Hospital
          </div>
          {/* Your content for selectedOption "birthday" goes here */}
        </div>
      ) : selectedOption === "Marriage" ? (
        // Render different content when selectedOption is "child"
        <div className=" h-full w-full p-2 ">
          <div className="rounded-md bg-white h-full flex items-center justify-center shadow-lg">
            Marriage
          </div>
          {/* Your content for selectedOption "child" goes here */}
        </div>
      ) : selectedOption === "Birth" ? (
        // Render different content when selectedOption is "child"
        <div className="h-full w-full p-2 rounded-md">
          <div className="rounded-md bg-white h-full flex items-center justify-center shadow-lg">
            Birth
          </div>
          {/* Your content for selectedOption "child" goes here */}
        </div>
      ) : selectedOption === "Child" ? (
        // Render different content when selectedOption is "child"
        <div className=" h-full w-full p-2 rounded-md">
          <div className="rounded-md bg-white h-full flex items-center justify-center shadow-lg">
            Child
          </div>
          {/* Your content for selectedOption "child" goes here */}
        </div>
      ) : (
        // Fallback when none of the conditions are met
        <div className=" h-full p-2">
          <div className="rounded-md w-full bg-white h-full"></div>
          {/* Your content for other selectedOptions goes here */}
        </div>
      )}
    </div>
  );
}

export default Part2;
