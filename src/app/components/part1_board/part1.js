import React from "react";
import Chartselection from "./chartselection/chartselection";
import Totalfee from "./totalfee/totalfee";
import Graph from "./graph/graph";

function Part1({ onOptionChange }) {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="h-2/6 p-2 w-full">
        <Graph />
      </div>
      <div className="h-1/6 p-2 w-full ">
        <Totalfee />
      </div>
      <div className="h-3/6 p-2 w-full">
        <div className="h-full w-full rounded-md shadow-lg bg-white flex items-center justify-center p-2 backdrop-opacity-10 hover:shadow-slate-400 transition duration-300 ease-in-out">
          <Chartselection onOptionChange={onOptionChange} />
        </div>
      </div>
    </div>
  );
}

export default Part1;
