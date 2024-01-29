import { connectToDB, pool } from "../../../../db/dbConfig";
import { NextResponse } from "next/server";
import sql from "mssql";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const connection = await connectToDB();
    const FormData = await req.json();
    const currentDate = new Date();
    const {
      user_code,
      type,
      groupName,
      closed,
      attendants,
      month,
      hospital_option,
    } = FormData;
    console.log(hospital_option);
    try {
      const price = [];
      const notFoundElements = [];

      if (groupName && type.includes("T")) {
        attendants.push(user_code);
        // console.log(attendants);
        await Promise.all(
          attendants.map(async (element) => {
            const query = `select Job_Date from user_Info where code = ${element}`;
            const workdatedb = await pool.request().query(query);

            if (workdatedb.recordset && workdatedb.recordset.length > 0) {
              console.log("!!", workdatedb.recordset[0].Job_Date);
              const workdate = new Date(workdatedb.recordset[0].Job_Date);
              const workday = Math.floor(
                (currentDate - workdate) / (1000 * 60 * 60 * 24)
              );
              if (workday >= 365) {
                price.push(6500);
              } else if (90 <= workday && workday < 365) {
                price.push(3500);
              } else {
                price.push(0);
              }
            } else {
              price.push(null);
              notFoundElements.push(element);
            }
          })
        );
      } else {
        const query = `select Job_Date from user_Info where code = ${user_code}`;
        const workdatedb = await pool.request().query(query);
        const workdate = new Date(workdatedb.recordset[0].Job_Date);
        const workday = Math.floor(
          (currentDate - workdate) / (1000 * 60 * 60 * 24)
        );
        if (workdatedb.recordset) {
          if (workday >= 365) {
            price.push(6500);
          } else if (90 <= workday && workday < 365) {
            price.push(3500);
          } else {
            price.push(0);
          }
        } else {
          price.push(null);
          notFoundElements.push(element);
        }
      }
      // console.log("price", price);
      // console.log("attendants", attendants);
      if (price.length > 1 && price.includes(null)) {
        return NextResponse.json({
          success: false,
          errortype: "attendants",
          message: `Failed to confirm: ${notFoundElements.join(", ")}`,
        });
      } else if (price.length > 1 && !price.includes(null)) {
        try {
          const queryforAnnualwelfare =
            "INSERT INTO annualwelfare_POST_TEST (user_code, type, price, closed, month, year, unicode, form_date) VALUES (@user_code, @type, @price, @closed, @month, @year, @unicode, @form_date)";

          const Max_unicodeQuery = `SELECT maxValue = MAX(CONVERT(INT, SUBSTRING(unicode, 3, LEN(unicode)-2))) FROM annualwelfare_POST_TEST WHERE unicode LIKE 'T-%';`;
          const Max_unicode = await pool.request().query(Max_unicodeQuery);
          const MaxNum_unicode = Max_unicode.recordset[0]?.maxValue || 0;
          const currentYear = currentDate.getFullYear();

          const inClause = attendants.map((code) => `'${code}'`).join(",");
          const sqlQuery = `SELECT * FROM annualwelfare_POST_TEST WHERE user_code IN (${inClause}) AND del_flag = 0 AND year = ${currentDate.getFullYear()} AND closed ='N';`;
          const result = await pool.request().query(sqlQuery);
          const recordeduser = result.recordset.map((item) => item.user_code);
          // console.log("resutl", recordeduser, result.recordset.length);
          if (result.recordset.length === 0) {
            for (let i = 0; i < attendants.length; i++) {
              await pool
                .request()
                .input("user_code", sql.NVarChar, attendants[i])
                .input("type", sql.NVarChar, type)
                .input("price", sql.Decimal, price[i])
                .input("closed", sql.NVarChar, closed)
                .input("month", sql.Int, parseInt(month, 10))
                .input("year", sql.Int, currentYear)
                .input("unicode", sql.NVarChar, "T-" + (MaxNum_unicode + 1))
                .input("form_date", sql.DateTime, currentDate)
                .query(queryforAnnualwelfare);
            }
          } else {
            await pool.close();
            return NextResponse.json({
              success: false,
              message: `${recordeduser} can only apply once a year`,
            });
          }

          await pool.close();
          //user_applystatus
          return NextResponse.json({
            success: true,
            message: "Application is sent successfully",
          });
        } catch (error) {
          console.error("Error inserting data:", error);
          return NextResponse.json({
            success: false,
            message: "Failed to add Personnel! Please try after some time.",
          });
        }
      } else {
        const sqlQuery = `SELECT * FROM annualwelfare_POST_TEST WHERE user_code IN (${user_code}) AND del_flag = 0 and year = ${currentDate.getFullYear()} AND closed ='N';`;
        const result = await pool.request().query(sqlQuery);
        const recordeduser = result.recordset;
        if (recordeduser.length < 1 && type.includes("H")) {
          const Max_unicodeQuery = `SELECT maxValue = MAX(CONVERT(INT, SUBSTRING(unicode, 3, LEN(unicode)-2))) FROM annualwelfare_POST_TEST WHERE unicode LIKE 'H-%';`;
          const Max_unicode = await pool.request().query(Max_unicodeQuery);
          const MaxNum_unicode = Max_unicode.recordset[0]?.maxValue || 0;
          const queryforAnnualwelfare =
            "INSERT INTO annualwelfare_POST_TEST (user_code, type, price, closed, contractor, year,unicode,  form_date) VALUES (@user_code, @type, @price, @closed, @contractor, @year, @unicode,@form_date)";
          await pool
            .request()
            .input("user_code", sql.NVarChar, user_code)
            .input("type", sql.NVarChar, type)
            .input("price", sql.Decimal, price[0])
            .input("closed", sql.NVarChar, closed)
            .input("year", sql.Int, currentDate.getFullYear())
            .input("contractor", sql.NVarChar, hospital_option)
            .input("unicode", sql.NVarChar, "H-" + (MaxNum_unicode + 1))
            .input("form_date", sql.DateTime, currentDate)
            .query(queryforAnnualwelfare);

          await pool.close();
          return NextResponse.json({
            success: true,
            message: "Application is sent successfully",
          });
        } else if (recordeduser.length < 1 && type.includes("E")) {
          const Max_unicodeQuery = `SELECT maxValue = MAX(CONVERT(INT, SUBSTRING(unicode, 3, LEN(unicode)-2))) FROM annualwelfare_POST_TEST WHERE unicode LIKE 'E-%';`;
          const Max_unicode = await pool.request().query(Max_unicodeQuery);
          const MaxNum_unicode = Max_unicode.recordset[0]?.maxValue || 0;
          const queryforAnnualwelfare =
            "INSERT INTO annualwelfare_POST_TEST (user_code, type, price, closed, month, year,  unicode,form_date) VALUES (@user_code, @type, @price, @closed,@month, @year, @unicode,@form_date)";
          await pool
            .request()
            .input("user_code", sql.NVarChar, user_code)
            .input("type", sql.NVarChar, type)
            .input("price", sql.Decimal, price[0])
            .input("closed", sql.NVarChar, closed)
            .input("month", sql.Int, month)
            .input("year", sql.Int, currentDate.getFullYear())
            .input("unicode", sql.NVarChar, "E-" + (MaxNum_unicode + 1))
            .input("form_date", sql.DateTime, currentDate)
            .query(queryforAnnualwelfare);

          await pool.close();
          return NextResponse.json({
            success: true,
            message: "Application is sent successfully",
          });
        }
        {
          return NextResponse.json({
            success: false,
            message: `${user_code} have applied for this year already.`,
          });
        }
      }
    } catch (e) {
      console.error(e);
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
