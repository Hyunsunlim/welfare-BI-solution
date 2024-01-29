import React from "react";
import { FaCircleNodes } from "react-icons/fa6";
function AnnualStatic() {
  return (
    <div className="h-full w-full rounded-md shadow-lg min-h-[130px]">
      <h1 className="text-center font-bold h-8">Submission Control</h1>
      <ul className="h-full w-full flex flex-col gap-1">
        <li className="flex w-full justify-center  items-center ">
          <FaCircleNodes size={10} />{" "}
          <span className="pl-2 pr-2 w-24 text-sm">Opened</span>
          <span className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-sm text-red-300">
            78
          </span>
        </li>
        <li className="flex items-center justify-center">
          <FaCircleNodes size={10} />
          <span className="pl-2 pr-2 w-24 text-sm">Closed</span>
          <span className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-sm text-white">
            136
          </span>
        </li>
        <li className="flex items-center justify-center">
          <FaCircleNodes size={10} />
          <span className="pl-2 pr-2 w-24 text-sm">Total</span>
          <span className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-sm text-white">
            214
          </span>
        </li>
      </ul>
    </div>
  );
}

export default AnnualStatic;
