"use client";
import React, { useState, useEffect } from "react";
import Table from "@/app/components/table";
import FormOutline from "@/app/components/Form/outline";

export default function Datapages() {
  const [alltable, setAlltable] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedTableData, setSelectedTableData] = useState([]);
  useEffect(() => {
    async function extractAllTableName() {
      try {
        const res = await fetch("/api/AllData", {
          method: "GET",
          cache: "no-store",
        });

        const jsonData = await res.json();
        console.log(jsonData);
        console.log(jsonData.tableNames);
        setAlltable(jsonData.tableNames || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    extractAllTableName();
  }, []);

  const handleTableChange = async (event) => {
    const selectedTableName = event.target.value;
    setSelectedTable(selectedTableName);

    try {
      const res = await fetch(
        `/api/AllData?tablename=${encodeURIComponent(selectedTableName)}`
      );
      console.log("Yes");
      const jsonData = await res.json();
      console.log(jsonData.tableDataResult);
      setSelectedTableData(jsonData.tableDataResult || []);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };
  useEffect(() => {
    console.log(selectedTable);
  }, [selectedTable]);
  return (
    <div className="flex flex-col w-full relative h-full bg-zinc-200 overflow-y-auto">
      <div className=" w-full h-full">
        <div className=" p-2 flex gap-4 ">
          <label htmlFor="lang">Tables:</label>
          <select
            className="w-48"
            onChange={handleTableChange}
            value={selectedTable}
          >
            {alltable.map((tablename, index) => (
              <option key={index}>{tablename}</option>
            ))}
          </select>
        </div>
        <div className=" p-2 flex overflow-hidden">
          <Table data={selectedTableData} />
        </div>
      </div>
    </div>
  );
}
