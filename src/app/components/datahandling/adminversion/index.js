import React, { useEffect, useState } from "react";
import Openeddata from "./OpenedData";
import Closeddata from "./ClosedData";

function DatapageforAdmin() {
  const [openData, setOpenData] = useState([]);
  const [closedData, setClosedData] = useState([]);

  async function handleGetOpenedannualWelfareData() {
    const res = await fetch("/api/AllData", {
      method: "GET",
      cache: "no-store",
    });

    const jsonData = await res.json();
    setOpenData(jsonData.AllOpenedApplication);
    setClosedData(jsonData.AllClosedApplication);
  }
  console.log("ClosedData", closedData);
  useEffect(() => {
    handleGetOpenedannualWelfareData();
  }, []);

  const [approvals, setApprovals] = useState([]);

  async function handleGetUpdate() {
    const res = await fetch("/api/AdminUpdateData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(approvals),
    });
    const data = await res.json();

    if (data && data.success) {
      window.alert(data.message);
      location.reload();
    } else {
      window.alert(data.message);
    }
  }

  return (
    <div className="pt-4 flex flex-col w-full  gap-12 h-full  ">
      <div className="w-full  bg-slate-900 shadow-lg bg-opacity-20 rounded-md h-full flex flex-col ">
        <div className="h-12 flex items-center bg-slate-100 bg-opacity-20 shadow-lg rounded-t-md  justify-center font-bold">
          Opened Application
        </div>
        <div className="overflow-y-auto flex-1">
          <Openeddata
            OpenedData={openData}
            setApprovals={setApprovals}
            approvals={approvals}
          />
        </div>
        <div className="flex items-center justify-center p-2">
          <button
            className="p-1 w-16 rounded-md bg-slate-500 text-white"
            onClick={handleGetUpdate}
          >
            Update
          </button>
        </div>
      </div>
      <div className="w-full  bg-slate-900 shadow-lg bg-opacity-20 rounded-md  h-full flex flex-col  ">
        <div className="h-12 items-center  justify-center bg-slate-100 bg-opacity-20 shadow-lg rounded-t-md flex flex-col font-bold">
          Closed Application
        </div>
        <div className="h-full flex-1 overflow-y-auto">
          <Closeddata ClosedData={closedData} />
        </div>
      </div>
    </div>
  );
}

export default DatapageforAdmin;
