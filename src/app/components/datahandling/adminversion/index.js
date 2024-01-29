import React, { useEffect, useState } from "react";
import Openeddata from "./OpenedData";

function DatapageforAdmin() {
  const [openData, setOpenData] = useState([]);
  async function handleGetOpenedannualWelfareData() {
    const res = await fetch("/api/AllData", {
      method: "GET",
      cache: "no-store",
    });

    const jsonData = await res.json();

    setOpenData(jsonData.AllOpenedApplication);
  }
  console.log("OpenedData", openData);
  useEffect(() => {
    handleGetOpenedannualWelfareData();
  }, []);
  return (
    <div className="pt-4 flex flex-col w-full  gap-12 h-full  ">
      <div className="w-full  bg-slate-900 shadow-lg bg-opacity-20 rounded-md h-full flex flex-col ">
        <div className="h-12 flex items-center bg-slate-100 bg-opacity-20 shadow-lg rounded-t-md  justify-center font-bold">
          Opened Application
        </div>
        <div className="overflow-y-auto flex-1">
          <Openeddata OpenedData={openData} />
        </div>
        <div className="flex items-center justify-center p-2">
          <button className="p-1 w-16 rounded-md bg-slate-500 text-white">
            Update
          </button>
        </div>
      </div>
      <div className="w-full  bg-slate-900 shadow-lg bg-opacity-20 rounded-md  h-full flex flex-col  ">
        <div className="h-12 items-center  justify-center bg-slate-100 bg-opacity-20 shadow-lg rounded-t-md flex flex-col font-bold">
          Closed Application
        </div>
        <div className="h-full flex-1 overflow-y-auto"></div>
      </div>
    </div>
  );
}

export default DatapageforAdmin;
