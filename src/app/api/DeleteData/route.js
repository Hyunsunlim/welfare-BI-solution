import { connectToDB, pool } from "../../../../db/dbConfig";
import { NextResponse } from "next/server";
import sql from "mssql";

export const dynamic = "force-dynamic";

export async function PATCH(req) {
  try {
    const connection = await connectToDB();
    const UpdateFormData = await req.json();
    const currentDate = new Date();
    console.log(UpdateFormData);
    const currentYear = currentDate.getFullYear();
    const querytogetunicode = `SELECT * from annualwelfare_POST_TEST where unicode = (SELECT unicode from annualwelfare_POST_TEST where user_code = ${UpdateFormData.user_code} and year = ${currentYear} and del_flag = 0);`;
    const result = await pool.request().query(querytogetunicode);
    console.log(result.recordset);
    if (UpdateFormData.type.includes("T")) {
      for (let i = 0; i < result.recordset.length; i++) {
        await pool
          .request()
          .input("del_flag", sql.Int, 1)
          .input(
            "current_user_code",
            sql.NVarChar,
            result.recordset[i].user_code.trim()
          )
          .query(
            `UPDATE annualwelfare_POST_TEST
          SET del_flag = @del_flag
          WHERE
            user_code = @current_user_code`
          );
      }
      console.log("Yayy");
    } else {
      await pool
        .request()
        .input("del_flag", sql.Bit, 1)
        .input("current_user_code", sql.NVarChar, UpdateFormData.user_code)
        .input("current_year", sql.Int, currentYear).query(`
          UPDATE annualwelfare_POST_TEST
          SET del_flag = @del_flag
          WHERE user_code = @current_user_code
            AND year = @current_year
      `);
    }
    console.log(UpdateFormData);
    return NextResponse.json({
      success: true,
      message: "Deleted!",
    });
  } catch (error) {
    // Handle errors if needed
    console.error(error);
    return NextResponse.error("Internal Server Error");
  }
}
