import { NextResponse } from "next/server";
import { connectToDB, pool } from "../../../../db/dbConfig";
import { parse } from "url";

export async function GET(req) {
  try {
    await connectToDB();
    const parsedUrl =
      typeof req.url === "string" ? parse(req.url, true) : req.url;
    //UserData
    const loginID = parsedUrl.query && parsedUrl.query.loginID;
    // const loginID = req.query.storedLoginID;
    // console.log(">>", loginID);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const user_annualApplyQuery = `SELECT * FROM user_Info JOIN annualwelfare_POST_TEST ON user_Info.code = annualwelfare_POST_TEST.user_code WHERE LOGIN_ID = '${loginID}' AND Year = '${currentYear}' AND del_flag = 0;`;
    const user_annualApply = await pool.request().query(user_annualApplyQuery);
    const user_Annualstatus = user_annualApply.recordset;
    // console.log(">>", user_Annualstatus);

    //Select Table Name
    const AlltableNames =
      "SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE'";
    const result = await pool.request().query(AlltableNames);

    const { query } = parse(req.url, true);
    const selectedTable = query.tablename;

    //Get Table Data According to Selected Table
    if (result.recordset) {
      const tableNames = result.recordset.map((record) => record.table_name);
      let tableDataResult = null;
      if (selectedTable) {
        const tableDataQuery = `SELECT * FROM ${selectedTable}`;
        tableDataResult = await pool.request().query(tableDataQuery);

        //Date Type이 javascript로 변환되면서 UTC 형식으로 자동변환된 것을 원하는 형식으로 수동변환 시켜줌
        if (tableDataResult?.recordset) {
          const dateFormatOptions = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          };

          const dateFormatOptions2 = {
            month: "2-digit",
            day: "2-digit",
          };

          tableDataResult.recordset.forEach((row) => {
            // Format 'hired_date' and 'birthday' using Intl.DateTimeFormat
            if (row.hired_date) {
              row.hired_date = new Intl.DateTimeFormat(
                "en-US",
                dateFormatOptions
              ).format(row.hired_date);
              row.birthday = new Intl.DateTimeFormat(
                "en-US",
                dateFormatOptions2
              ).format(row.birthday);
            }
          });

          //console.log(tableDataResult.recordset);
        }
      }

      //Get Unusage Ratio Data for 3合中1
      const CountUnusage =
        "SELECT (COUNT(*) * 100.0) / (SELECT COUNT(*) FROM oneofthree) AS percentage FROM oneofthree WHERE year = 2023 AND Type = '';";
      const Unusage = await pool.request().query(CountUnusage);
      const UnusagePercentage = Unusage.recordset;

      //Get Monthly Usage Status Data for 3合中1

      // const Querymonthlyusageforoneofthree =
      //   "SELECT CONCAT(year, '-', month) AS date,type, COUNT(*) AS count FROM oneofthree WHERE type IN ('T', 'H', 'E') GROUP BY CONCAT(year, '-', month), type ORDER BY type;";
      const Querymonthlyusageforoneofthree =
        "SELECT CONCAT(year, '-', month) AS date,type, COUNT(*) AS count FROM oneofthree WHERE type IN ('T', 'H', 'E') AND year = 2023 GROUP BY year, month, type ORDER BY type, year, month;";
      const monthlyusageforoneofthree = await pool
        .request()
        .query(Querymonthlyusageforoneofthree);

      const monthlyusagedata = monthlyusageforoneofthree.recordset;

      // console.log("Uymonthlyusage:", monthlyusagedata);
      const MonthlyresultObj = {
        T: [],
        E: [],
        H: [],
      };
      monthlyusagedata.forEach((row) => {
        const { type, date, count } = row;
        const trimmedType = type.trim(); //공백 없애기 위힘
        MonthlyresultObj[trimmedType].push({ date, count });
      });

      //Get 3中1 Prices
      const QueryoneofThreeTotalPrice =
        "SELECT SUM(price) AS oneofthreeprice FROM oneofthree WHERE type != '' AND (type = 'T' OR type = 'H' OR type = 'E') AND year = 2023";
      const oneOfthreePrice = await pool
        .request()
        .query(QueryoneofThreeTotalPrice);
      const TotalpriceOneofthree = oneOfthreePrice.recordset;

      //Get 3中1 Top3
      const QueryTop3oneofthree =
        "SELECT type, COUNT(*) AS count FROM oneofthree WHERE type IN ('T', 'H', 'E') AND year = 2023 GROUP BY type ORDER BY count DESC;";
      const Top3oneofthree = await pool.request().query(QueryTop3oneofthree);
      const Top3oneofthreeData = Top3oneofthree.recordset;
      //Get price for Marriage:1/Birth:2/Child:3
      const QueryForpersonalEvent =
        "SELECT CASE WHEN type = 1 THEN 'marriage' WHEN type = 2 THEN 'birth' WHEN type = 3 THEN 'child' WHEN type = 5 THEN 'Hospital' END AS categories, SUM(price) AS total_price FROM personalEvent WHERE type IN (1, 2, 3,5) GROUP BY type;";
      const personalEvent = await pool.request().query(QueryForpersonalEvent);
      const personalEventData = personalEvent.recordset;

      //Get Input/Output for total Cash flow
      const Queryforcashflow =
        "Select type as name, sum(amount) as value from cashflow where year = 2023 and type in ('C', 'E', 'O') group by type";
      const Cashflow = await pool.request().query(Queryforcashflow);
      const Cashflowresult = Cashflow.recordset;
      //Data for Amin
      const Queryforopeneddata =
        "Select a.unicode as Unicode, MIN(u.Name) AS User_name,count(a.user_code) AS Total_No,SUM(a.price) AS Total_Price,a.year AS Year,a.month AS Month, DATEDIFF(DAY, a.form_date, GETDATE()) AS Elapsed_days from annualwelfare_POST_TEST a JOIN user_Info u ON a.user_code = u.code where a.closed = 'N' AND a.del_flag = 0 group by a.unicode, a.month, a.year, a.form_date ORDER BY Elapsed_days DESC;";
      const openeddata = await pool.request().query(Queryforopeneddata);
      const AllOpenedApplication = openeddata.recordset;

      const Queryforcloseddata =
        "Select a.unicode as Unicode, MIN(u.Name) AS User_name,count(a.user_code) AS Total_No,SUM(a.price) AS Total_Price,a.year AS Year,a.month AS Month, DATEDIFF(DAY, a.form_date, GETDATE()) AS Elapsed_days from annualwelfare_POST_TEST a JOIN user_Info u ON a.user_code = u.code where a.closed != 'N' AND a.del_flag = 0 group by a.unicode, a.month, a.year, a.form_date ORDER BY Elapsed_days ASC;";
      const closeddata = await pool.request().query(Queryforcloseddata);
      const AllClosedApplication = closeddata.recordset;

      //Data를 json형식으로 내보내기
      return NextResponse.json({
        tableNames,
        tableDataResult: tableDataResult?.recordset,
        UnusagePercentage,
        TotalpriceOneofthree,
        MonthlyresultObj,
        Top3oneofthreeData,
        personalEventData,
        Cashflowresult,
        user_Annualstatus,
        AllOpenedApplication,
        AllClosedApplication,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No data found in workInfo table",
      });
    }
  } catch (e) {
    console.error("Error:", e.message);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
