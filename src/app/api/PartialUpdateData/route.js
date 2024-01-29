import { connectToDB, pool } from "../../../../db/dbConfig";
import { NextResponse } from "next/server";
import sql from "mssql";
import { Andada_Pro } from "next/font/google";

export const dynamic = "force-dynamic";

export async function PATCH(req) {
  try {
    const connection = await connectToDB();
    const UpdateFormData = await req.json();
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    if (UpdateFormData.type.includes("H")) {
      await pool
        .request()
        .input("new_contractor", sql.NVarChar, UpdateFormData.hospital_option)
        .input("current_user_code", sql.NVarChar, UpdateFormData.user_code)
        .input("current_year", sql.Int, currentYear).query(`
          UPDATE annualwelfare_POST_TEST
          SET contractor = @new_contractor
          WHERE user_code = @current_user_code
            AND year = @current_year
      `);
      console.log("Health");
    } else if (UpdateFormData.type.includes("E")) {
      await pool
        .request()
        .input("new_month", sql.Int, parseInt(UpdateFormData.month, 10))
        .input("current_user_code", sql.NVarChar, UpdateFormData.user_code)
        .input("current_year", sql.Int, currentYear).query(`
          UPDATE annualwelfare_POST_TEST
          SET month = @new_month
          WHERE user_code = @current_user_code
            AND year = @current_year
      `);
      console.log("E");
    } else if (UpdateFormData.type.includes("T")) {
      console.log("T", UpdateFormData);
      //RemoveOrginal partner record
      await pool
        .request()
        .input("current_unicode", sql.NVarChar, UpdateFormData.unicode)
        .input("new_delflag", sql.Int, 1).query(`
        UPDATE annualwelfare_POST_TEST
        SET del_flag = @new_delflag
        WHERE unicode = @current_unicode
    `);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();

      UpdateFormData.attendants.unshift(UpdateFormData.user_code);
      console.log(UpdateFormData.attendants);
      const price = [];
      for (const attendee of UpdateFormData.attendants) {
        const query = `select Job_Date from user_Info where code = ${attendee}`;
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

      for (let i = 0; i < UpdateFormData.attendants.length; i++) {
        await pool
          .request()
          .input("user_code", sql.NVarChar, UpdateFormData.attendants[i])
          .input("type", sql.NVarChar, UpdateFormData.type)
          .input("price", sql.Decimal, price[i])
          .input("closed", sql.NVarChar, "N")
          .input("month", sql.Int, parseInt(UpdateFormData.month, 10))
          .input("year", sql.Int, currentYear)
          .input("unicode", sql.NVarChar, UpdateFormData.unicode)
          .input("form_date", sql.DateTime, currentDate).query(`
            INSERT INTO annualwelfare_POST_TEST
            (user_code, type, price, closed, month, year, unicode, form_date)
            VALUES
            (@user_code, @type, @price, @closed, @month, @year, @unicode, @form_date)
        `);
      }
      await pool.close();
    }
    return NextResponse.json({
      success: true,
      message: "Updated!!!",
    });
  } catch (error) {
    // Handle errors if needed
    console.error(error);
    return NextResponse.error("Internal Server Error");
  }
}
