import { connectToDB, pool } from "../../../../db/dbConfig";
import { NextResponse } from "next/server";
import sql from "mssql";

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
      console.log("T");
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
