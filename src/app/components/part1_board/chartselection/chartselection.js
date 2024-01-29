"use client";
import React, { useState, useEffect } from "react";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdChildCare } from "react-icons/md";
import { AiFillChrome } from "react-icons/ai";
import { GiSelfLove } from "react-icons/gi";
import { FaChildren } from "react-icons/fa6";
import { MdLocalHospital } from "react-icons/md";
import { extractDataAsJson } from "@/app/api/extractjson";

function ChartSelection({ onOptionChange }) {
  const [selectedOption, setSelectedOption] = useState("3中1");
  const [width, setWidth] = useState(window.innerWidth / 3);

  const [totalfeeforoptions, setTotalfeeforoptions] = useState([]);
  const handleOptionChange = (event) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);
    onOptionChange(newOption);
  };

  //UI Part: size effect__________________________________

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth / 3);
    };
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //**Total amount price for each options API_______________

  const [oneofthreePrice, setOneofthreePrice] = useState(0);
  const [personaleventPrice, setPersonaleventPrice] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { oneofthreeTotalprice, personalEventTotalPrice } =
        await extractDataAsJson();
      // Do something with the data, e.g., set state variables
      setOneofthreePrice(oneofthreeTotalprice || 0);
      setPersonaleventPrice(personalEventTotalPrice || []);
    }
    fetchData();
  }, []);

  //_________________________________________________________
  //Selection Options
  const options = [
    {
      id: 1,
      label: "3中1",
      total: oneofthreePrice,
      icon: <AiFillChrome size={15} style={{ marginRight: "5px" }} />,
    },
    {
      id: 2,
      label: "Hospital",
      total: personaleventPrice.find((event) => event.categories === "Hospital")
        ?.total_price,
      icon: <MdLocalHospital size={15} style={{ marginRight: "5px" }} />,
    },
    {
      id: 3,
      label: "Marriage",
      total: personaleventPrice.find((event) => event.categories === "marriage")
        ?.total_price,
      icon: <GiSelfLove size={15} style={{ marginRight: "5px" }} />,
    },
    {
      id: 4,
      label: "Birth",
      total: personaleventPrice.find((event) => event.categories === "birth")
        ?.total_price,
      icon: <MdChildCare size={15} style={{ marginRight: "5px" }} />,
    },
    {
      id: 5,
      label: "Child",
      total: personaleventPrice.find((event) => event.categories === "child")
        ?.total_price,
      icon: <FaChildren size={15} style={{ marginRight: "5px" }} />,
    },
  ];

  return (
    <div
      className={"w-full h-full flex flex-col p-2 justify-around rounded-md  "}
    >
      {options.map((option, index) => (
        <div
          className={`flex w-full items-center p-2  h-12 hover:rounded-md hover:bg-slate-800 hover:text-white hover:-translate-y-1 duration-150 flex-row  ${
            selectedOption === option.label
              ? " border-b-2 bg-slate-800 rounded-md"
              : ""
          }`}
          key={index}
        >
          <div className="flex  w-1/2 sm:w-full">
            <input
              type="radio"
              id={option.id}
              value={option.label}
              checked={selectedOption === option.label}
              onChange={handleOptionChange}
              style={{ display: "none" }} // Hide the default radio button
            />
            <label
              htmlFor={option.id}
              className={`cursor-pointer  flex items-center ${
                selectedOption === option.label ? " text-white" : ""
              }`}
            >
              {option.icon}
              {option.label}
            </label>
          </div>
          <div
            className={
              "flex w-full  items-center justify-end  p-1  xl:flex sm:hidden"
            }
            key={index}
          >
            <h1
              className={`flex text-sm ${
                selectedOption === option.label ? " text-white " : ""
              }`}
            >
              : {option.total} NTD
            </h1>
          </div>
        </div>
      ))}
      <div className="w-full flex justify-center xl:flex sm:hidden">
        <p className="text-#34495E ">Selected option: {selectedOption}</p>
      </div>
    </div>
  );
}

export default ChartSelection;
