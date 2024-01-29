import React, { useEffect, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";

function Categoryselection({ onChildData, close }) {
  const welfareCategories = [
    { label: "Annual Opportunity Welfare" },
    { label: "Conditional Opportunity Welfare" },
  ];

  const handleCategoryClick = (category) => {
    onChildData(category);
  };

  return (
    <div className=" h-full flex flex-col">
      <div className="flex item-start font-bold justify-between p-5 border-b border-solid rounded-t border-slate-200">
        CATEGORY SELECTION
      </div>
      <div className="h-full p-5 border-b-2 flex flex-col gap-4">
        {welfareCategories.map((category) => (
          <div
            key={category.label}
            className={`w-full rounded-md p-2 flex items-center justify-between bg-cyan-900 text-cyan-50 hover:bg-amber-300 hover:text-black
              `}
            onClick={() => handleCategoryClick(category.label)}
          >
            <h1>{category.label}</h1>
            <GrFormNextLink />
          </div>
        ))}
      </div>
      <div className="h-12 flex items-center justify-center p-2">
        <button
          className="w-24 h-full bg-black text-white hover:bg-red-500 rounded-md"
          onClick={() => {
            close(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Categoryselection;
