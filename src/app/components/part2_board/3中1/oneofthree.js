"use client";
import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import MonthBar from "../../graph/oneofthree/monthBar";
import UsageRate from "../../graph/oneofthree/usagerate";
import Top3Bar from "../../graph/oneofthree/top3bar";
import { extractDataAsJson } from "@/app/api/extractjson";
import AnnualStatic from "../../statistic/annual";

function Oneofthree() {
  const [unusage, setUnusage] = useState(0);
  const [monthly, setMonthly] = useState([]);
  const [top, setTop] = useState([]);

  const calculateInitialWidth = () => {
    const initialWidth = Math.floor(window.innerWidth / 3);
    return window.innerWidth < 550 ? 380 : initialWidth;
  };
  const [width, setWidth] = useState(calculateInitialWidth);
  const [height, setHeight] = useState(Math.floor(window.innerHeight / 4));

  useEffect(() => {
    async function fetchData() {
      const { UnsagePercentage, MonthlyresultObj, Top3oneofthreeData } =
        await extractDataAsJson();
      // Do something with the data, e.g., set state variables
      setUnusage(UnsagePercentage || 0);
      setMonthly(MonthlyresultObj || []);
      setTop(Top3oneofthreeData || []);
    }
    fetchData();
  }, []);

  //Data for Unused Ratio Bar Chart------------------------------------
  const data = [
    {
      value: unusage / 100,
      fill: "#4392D5",
      label: "Unusaged Percentage",
    },
  ];

  const handleResize = () => {
    const newWidth = Math.floor(window.innerWidth / 4);
    const newHeight = Math.floor(window.innerHeight / 4);
    if (newWidth < 200) {
      setWidth(newWidth * 2.5);
    } else {
      setWidth(newWidth);
    }
    setHeight(newHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const oConfig = {
    width: width,
    height: 70,
    transitionDuration: 750,
    maxBarValue: 1,
    valueFormatter: d3.format(".0%"),
  };
  //------------------------------------
  return (
    <div className="w-full h-full flex flex-col items-center justify-evenly">
      <div className="flex items-center justify-center w-full h-1/5 p-2 ">
        <div className="w-2/3 p-2  h-full">
          <UsageRate data={data} chartConfig={oConfig} />
        </div>
        <div className="w-1/3 p-2 h-full sm:hidden xl:flex">
          <AnnualStatic />
        </div>
      </div>
      <div className=" flex flex-col items-center justify-center w-full h-2/5 p-2">
        <Top3Bar dataset={top} />
      </div>
      <div className="flex flex-col items-center justify-center w-full h-2/5 p-2">
        <MonthBar data={monthly} />
      </div>
    </div>
  );
}

export default Oneofthree;
