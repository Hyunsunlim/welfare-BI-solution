import React from "react";
import Satisfy from "../graph/feedback/satisfying";
import HorizontalBarChart from "../graph/feedback/suggestion";

function Part3() {
  return (
    <div className="w-full h-full p-2 ">
      <div className="bg-white shadow-lg rounded-md w-full h-full flex flex-col items-center justify-center p-2 hover:shadow-slate-400 transition duration-300 ease-in-out">
        <div className="w-full h-1/3 flex flex-col items-center justify-evenly">
          <h1 className="h-1/5 flex items-center">Satisfy</h1>
          <div className="h-4/5 w-full">
            <Satisfy />
          </div>
        </div>
        <div className="w-full h-2/3 flex flex-col items-center justify-center">
          <h1 className="h-1/5 flex items-center">Suggestion</h1>
          <div className="h-4/5 w-full">
            <HorizontalBarChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Part3;
