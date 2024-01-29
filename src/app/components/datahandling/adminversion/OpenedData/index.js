import React, { useEffect, useState } from "react";

function Openeddata({ OpenedData, setApprovals, approvals }) {
  const columnNames = OpenedData.length > 0 ? Object.keys(OpenedData[0]) : [];
  const [monthH, setMonthH] = useState("");

  const OpenedDataObject = OpenedData.length > 0 ? OpenedData : [];

  const handleCheckboxChange = (rowIndex, value, code) => {
    const newApprovals = [...approvals];
    const existingApprovalIndex = newApprovals.findIndex(
      (approval) => approval?.rowIndex === rowIndex
    );
    if (
      existingApprovalIndex !== -1 &&
      newApprovals[existingApprovalIndex]?.approval === value
    ) {
      newApprovals.splice(existingApprovalIndex, 1);
    } else {
      newApprovals[rowIndex] = {
        rowIndex,
        approval: value,
        month: monthH,
        unicode: code.trim(),
      };
    }
    setApprovals(newApprovals);
  };

  // console.log("OpenedDataObject", OpenedDataObject);
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
          {OpenedDataObject.map((row, rowIndex) => (
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
                    {row[columnkey] == null ? (
                      <input
                        type="text"
                        className="w-full rounded-md shadow-sm text-center"
                        onChange={(e) => setMonthH(e.target.value)}
                      />
                    ) : (
                      row[columnkey]
                    )}
                  </div>
                ))}
              <div className="flex-1 flex items-center justify-center gap-2">
                <label className="flex gap-1">
                  <input
                    type="checkbox"
                    className="accent-blue-500"
                    checked={approvals[rowIndex]?.approval === "Y"}
                    onChange={() =>
                      handleCheckboxChange(rowIndex, "Y", row.Unicode)
                    }
                  />
                  Y
                </label>
                <label className="flex gap-1">
                  <input
                    type="checkbox"
                    className="accent-pink-500"
                    checked={approvals[rowIndex]?.approval === "N"}
                    onChange={() =>
                      handleCheckboxChange(rowIndex, "N", row.Unicode)
                    }
                  />
                  N
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Openeddata;
