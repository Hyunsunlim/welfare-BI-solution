import React, { useEffect, useState } from "react";

function Closeddata({ ClosedData }) {
  const columnNames = ClosedData.length > 0 ? Object.keys(ClosedData[0]) : [];
  console.log("Closed", ClosedData);
  const ClosedDataObject = ClosedData.length > 0 ? ClosedData : [];

  return (
    <div className="flex flex-col h-full w-full relative ">
      <div className="sticky h-8 w-full top-0 left-0 z-50 flex bg-opacity-20 shadow-md bg-gray-800 text-white rounded-sm">
        {columnNames.map((item, index) => (
          <div key={index} className="flex-1 flex items-center justify-center">
            {item === "User_name"
              ? "Applicant"
              : item === "Total_Price"
              ? "Total $"
              : item === "Total_No"
              ? "Total No."
              : item}
          </div>
        ))}
        <div className="flex-1 flex items-center justify-center">Approval</div>
      </div>
      <div className="flex flex-1 relative flex-col overflow-y-auto pt-2">
        <div>
          {ClosedDataObject.map((row, rowIndex) => (
            <div key={rowIndex} className="flex items-center justify-center">
              {row &&
                Object.keys(row).map((columnkey, colIndex) => (
                  <div
                    key={colIndex}
                    className={`flex-1 flex items-center justify-center ${
                      columnkey === "Elapsed_days" && row[columnkey] >= 7
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {row[columnkey] == null ? "-" : row[columnkey]}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Closeddata;
