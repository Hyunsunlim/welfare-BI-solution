import React, { useEffect, useState } from "react";
import Pie1 from "../../graph/overal/pie1";
import Pie2 from "../../graph/overal/pie2";
import { extractDataAsJson } from "@/app/api/extractjson";

function Graph() {
  const [piechange, setPiechange] = useState(false);
  console.log(piechange);

  const [inputtotal, setInputtotal] = useState([]);
  const [outputtotal, setOutputtotal] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { inputTotalPrice, oneofthreeTotalprice, personalEventTotalPrice } =
        await extractDataAsJson();

      setInputtotal(inputTotalPrice || []);
      const newObject = {
        categorie: "oneofthree",
        total_price: parseFloat(oneofthreeTotalprice.replace(/,/g, "")),
      };
      personalEventTotalPrice.push(newObject);
      setOutputtotal([...personalEventTotalPrice]);
    }
    fetchData();
  }, []);
  console.log("??", outputtotal);
  return (
    <div className="w-full h-full shadow-lg hover:shadow-slate-400 transition duration-300 ease-in-out">
      <div className="w-full h-full rounded-md flex flex-col justify-center items-center bg-white">
        <div className="w-full h-1/5 pl-6  flex items-center">
          <button
            className={` w-24 rounded-md shadow-lg 
            ${
              piechange
                ? "bg-yellow-400 hover:bg-yellow-100"
                : "bg-blue-100 hover:bg-blue-300"
            }`}
            onClick={() => {
              setPiechange(!piechange);
            }}
          >
            {piechange ? "Output" : "Input"}
          </button>
        </div>
        <div className="h-4/5 w-full flex items-center p-2">
          {piechange ? (
            <Pie2 dataset={outputtotal} />
          ) : (
            <Pie1 dataset={inputtotal} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Graph;
