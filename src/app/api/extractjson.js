import React from "react";

export async function extractDataAsJson() {
  try {
    const res = await fetch("/api/AllData", {
      method: "GET",
      cache: "no-store",
    });

    const jsonData = await res.json();

    const UnsagePercentage = jsonData.UnusagePercentage[0].percentage;
    const MonthlyresultObj = jsonData.MonthlyresultObj;
    const Top3oneofthreeData = jsonData.Top3oneofthreeData;
    const oneofthreeTotalprice =
      jsonData.TotalpriceOneofthree[0].oneofthreeprice.toLocaleString();
    const personalEventTotalPrice = jsonData.personalEventData;
    const inputTotalPrice = jsonData.Cashflowresult;

    return {
      UnsagePercentage,
      MonthlyresultObj,
      Top3oneofthreeData,
      oneofthreeTotalprice,
      personalEventTotalPrice,
      inputTotalPrice,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
