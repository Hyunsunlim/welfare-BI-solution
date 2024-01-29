import React, { useState, useEffect } from "react";

function Totalfee() {
  const [oneofthreePrice, setOneofthreePrice] = useState(0);
  const [personaleventPrice, setPersonaleventPrice] = useState([]);

  useEffect(() => {
    async function extractoneofthreePrice() {
      try {
        const res = await fetch("/api/AllData", {
          method: "GET",
          cache: "no-store",
        });

        const jsonData = await res.json();
        setOneofthreePrice(
          jsonData.TotalpriceOneofthree[0].oneofthreeprice.toLocaleString() || 0
        );
        setPersonaleventPrice(jsonData.personalEventData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    extractoneofthreePrice();
  }, []);

  const personaleventotalPrice = personaleventPrice.reduce(
    (sum, item) => sum + item.total_price,
    0
  );
  const oneofThreePriceInt = parseFloat(
    oneofthreePrice.toString().replace(/,/g, "")
  );

  let totalprice = personaleventotalPrice + oneofThreePriceInt;
  let formatting_totalprice = totalprice.toLocaleString();

  return (
    <div className="shadow-lg w-full h-full rounded-md bg-white p-4 backdrop-opacity-10 hover:shadow-slate-400 transition duration-300 ease-in-out">
      <div className="w-full rounded-md h-10  flex justify-center text-white items-center bg-slate-700 hover:-translate-y-1 duration-150">
        <h1>補助費總價</h1>
      </div>
      <div className="w-full p-2 flex justify-center  items-center">
        <h2 className="underline flex underline-offset-8 text-black  decoration-slate-700 text-sm">
          {formatting_totalprice}
          <span className="flex sm:hidden xl:flex">NTD</span>
        </h2>
      </div>
    </div>
  );
}

export default Totalfee;
