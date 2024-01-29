"use client";
import React, { useState, useEffect } from "react";
import Table from "@/app/components/table";
import FormOutline from "@/app/components/Form/outline";
import DatapageforUser from "@/app/components/datahandling/userversion";
import DatapageforAdmin from "@/app/components/datahandling/adminversion";

export default function Datapages() {
  const [identity, setIdentity] = useState("");
  const [storedloginID, setStoredloginID] = useState("");
  const [storedWorkingDays, setStoredWorkingDays] = useState(null);
  const [userAnnualApplyData, setUserAnnualApplyData] = useState(null);
  useEffect(() => {
    const storedLoginID = localStorage.getItem("loginID");
    const storedDays = localStorage.getItem("workedDays");
    const storedRole = localStorage.getItem("role");
    if (storedLoginID) {
      setStoredloginID(storedLoginID);
      setStoredWorkingDays(storedDays);
    }
    if (storedRole == 0) {
      setIdentity("User");
    } else if (storedRole == 1) {
      setIdentity("Admin");
    }

    async function extractApplicationData() {
      try {
        const res = await fetch(`/api/AllData?loginID=${storedLoginID}`, {
          method: "GET",
          cache: "no-store",
        });

        const jsonData = await res.json();
        const user_annualApplyData = jsonData.user_Annualstatus;
        setUserAnnualApplyData(user_annualApplyData);
        console.log("<<", jsonData.user_Annualstatus);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    extractApplicationData();
  }, []);

  return (
    <div className="bg-zinc-50 flex flex-col w-full relative h-full  overflow-y-auto">
      <div className=" w-full h-full">
        <FormOutline
          identity={identity}
          LoginID={storedloginID}
          WorkDays={storedWorkingDays}
        >
          {identity === "User" ? (
            <DatapageforUser userAnnualData={userAnnualApplyData} />
          ) : identity === "Admin" ? (
            <DatapageforAdmin />
          ) : null}
        </FormOutline>
      </div>
    </div>
  );
}
