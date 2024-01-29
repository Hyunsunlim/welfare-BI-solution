"use client";
import React, { useState, useEffect } from "react";

function Table({ data }) {
  console.log({ data });
  if (!data || data.length === 0) {
    return <div>Select table to display.</div>;
  }
  let tableHeaders = Object.keys(data[0]);
  if (tableHeaders.includes("uuid")) {
    tableHeaders = tableHeaders.filter((header) => header !== "uuid");
  }
  const minColumnWidth = 200;
  const [columnWidth, setColumnWidth] = useState(calculateColumnWidth);

  function calculateColumnWidth() {
    const screenWidth = window.innerWidth;
    const numberOfColumns = tableHeaders.length;

    const calculatedWidth = Math.max(
      screenWidth / numberOfColumns,
      minColumnWidth
    );
    return `${calculatedWidth}px`;
  }

  useEffect(() => {
    const handleResize = () => {
      setColumnWidth(calculateColumnWidth());
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [tableHeaders, minColumnWidth]);

  return (
    <div className="w-full h-full bg-white " style={{ minWidth: "900px" }}>
      <div
        className="rounded-sm border border-stroke  px-5 pt-6 pb-2.5 shadow sm:px-7.5 xl:pb-1"
        style={{ minWidth: "900px" }}
      >
        <div className="flex flex-col ">
          <div
            className="flex rounded-sm bg-white"
            style={{ minWidth: "800px" }}
          >
            {tableHeaders.map((header, index) => (
              <div
                className="text-center font-bold"
                key={index}
                style={{ width: columnWidth }}
              >
                {header}
              </div>
            ))}
          </div>

          {data.map((item, rowIndex) => (
            <div
              className="flex border-b border-stroke "
              key={rowIndex}
              style={{ minWidth: "800px" }}
            >
              {/* Render table cells using the keys and corresponding values */}
              {tableHeaders.map((header, cellIndex) => (
                <div
                  key={cellIndex}
                  className="flex items-center justify-center"
                  style={{ width: columnWidth }}
                >
                  <p className="text-center">{item[header]}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Table;
