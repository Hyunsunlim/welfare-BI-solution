import React, { useEffect, useState } from "react";
import Formstructure from "../../Form/formstructure";

function DatapageforUser({ userAnnualData }) {
  const [showupdateform, setShowupdateform] = useState(false);
  const [updateItem, setUpdateItem] = useState([]);

  const [closeddata, setCloseddata] = useState([]);
  const [openeddata, setOpeneddata] = useState([]);
  console.log(userAnnualData);
  useEffect(() => {
    if (userAnnualData) {
      const closedData = userAnnualData.filter(
        (item) => item.closed.trim() !== "N"
      );
      setCloseddata(closedData);
      const notClosedData = userAnnualData.filter(
        (item) => item.closed.trim() === "N"
      );
      setOpeneddata(notClosedData);
    }
  }, [userAnnualData]);

  const handleDivClick = (index) => {
    setUpdateItem(openeddata[index]);
    setShowupdateform(true);
  };
  const header = [
    "Code",
    "Type",
    "Price",
    "Year",
    "Month",
    "Contractor",
    "Status",
    "Elapsed Days",
  ];
  return (
    <>
      {showupdateform ? (
        <Formstructure
          show={showupdateform}
          setShow={setShowupdateform}
          identity="User"
          update={updateItem}
        />
      ) : (
        <div className="pt-4 flex gap-12 h-full   flex-col">
          <div className=" bg-slate-100 shadow-lg bg-opacity-20 rounded-md h-1/2 w-full flex flex-col min-h-[300px]">
            <div className="h-12 flex items-center bg-slate-100 bg-opacity-20 shadow-lg rounded-t-md  justify-center font-bold text-lg">
              Application Status
            </div>
            <div className="overflow-y-auto flex-1">
              <div className="flex border-b p-2 bg-gray-200 rounded-t-md">
                {header.map((i) => (
                  <div
                    className={`text-center font-bold ${
                      i == "Contractor" || i === "Month" || i === "Type"
                        ? "hidden lg:flex lg:flex-1 lg:justify-center"
                        : "flex-1"
                    }`}
                    key={i}
                  >
                    {i}
                  </div>
                ))}
              </div>
              {openeddata && openeddata.length > 0 ? (
                openeddata.map((data, index) => {
                  const formData = new Date(data.form_date);
                  const elapsedTimeInDays = Math.floor(
                    (new Date() - formData) / (1000 * 60 * 60 * 24)
                  );
                  return (
                    <div
                      key={index}
                      className="flex p-2 shadow-md cursor-pointer hover:bg-red-50"
                      onClick={() => handleDivClick(index)}
                    >
                      <div className="flex-1 text-center">{data.unicode}</div>
                      <div className="text-center hidden lg:flex lg:flex-1 lg:justify-center">
                        {data.type.includes("T")
                          ? "Travel"
                          : data.type.includes("H")
                          ? "Health-Check"
                          : "Education"}
                      </div>

                      <div className="flex-1 text-center">{data.price}</div>
                      <div className="flex-1 text-center">{data.year}</div>
                      <div className="text-center hidden lg:flex lg:flex-1 lg:justify-center">
                        {data.month}
                      </div>
                      <div className=" text-center hidden lg:flex lg:flex-1 lg:justify-center">
                        {data.contractor}
                      </div>
                      <div className="flex-1 text-center">
                        {data.closed.includes("N") ? "Reviewing" : data.closed}
                      </div>
                      <div
                        className={`flex-1 text-center ${
                          elapsedTimeInDays >= 7 ? "text-red-500" : "text-black"
                        }`}
                      >
                        {elapsedTimeInDays}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-center p-4 text-red-500">
                  No data available
                </div>
              )}
            </div>
          </div>
          <div className=" bg-slate-100 shadow-lg bg-opacity-20 rounded-md  h-1/2 w-full flex flex-col min-h-[300px] ">
            <div className="h-12 items-center  justify-center bg-slate-100 bg-opacity-20 shadow-lg rounded-t-md flex flex-col font-bold text-lg">
              Previous Record
            </div>
            <div className="overflow-y-auto flex-1 relative">
              <div className="flex border-b p-2 bg-gray-200 rounded-t-md sticky top-0 left-0">
                {header.map((i) => (
                  <div
                    className={`text-center font-bold ${
                      i == "Contractor" || i === "Month" || i === "Type"
                        ? "hidden lg:flex lg:flex-1 lg:justify-center"
                        : "flex-1"
                    }`}
                    key={i}
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                {closeddata && closeddata.length > 0 ? (
                  closeddata.map((data, index) => {
                    const formData = new Date(data.form_date);
                    const closedData = new Date(data.closed_date);
                    const elapsedTimeInDays = Math.floor(
                      (closedData - formData) / (1000 * 60 * 60 * 24)
                    );
                    return (
                      <div
                        key={index}
                        className="flex p-2 shadow-md cursor-pointer hover:bg-red-50"
                        // onClick={() => handleDivClick(index)}
                      >
                        <div className="flex-1 text-center">{data.unicode}</div>
                        <div className="text-center hidden lg:flex lg:flex-1 lg:justify-center">
                          {data.type.includes("T")
                            ? "Travel"
                            : data.type.includes("H")
                            ? "Health-Check"
                            : "Education"}
                        </div>

                        <div className="flex-1 text-center">{data.price}</div>
                        <div className="flex-1 text-center">{data.year}</div>
                        <div className="text-center hidden lg:flex lg:flex-1 lg:justify-center">
                          {data.month}
                        </div>
                        <div className=" text-center hidden lg:flex lg:flex-1 lg:justify-center">
                          {data.contractor}
                        </div>
                        <div className="flex-1 text-center">
                          {data.closed.includes("N")
                            ? "Reviewing"
                            : data.closed}
                        </div>
                        <div
                          className={`flex-1 text-center ${
                            elapsedTimeInDays >= 7
                              ? "text-red-500"
                              : "text-black"
                          }`}
                        >
                          {elapsedTimeInDays}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center p-4 text-red-500">
                    No data available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DatapageforUser;
