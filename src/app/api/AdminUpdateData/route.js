import { connectToDB, pool } from "../../../../db/dbConfig";
import { NextResponse } from "next/server";
import sql from "mssql";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const connection = await connectToDB();
    const UpdateFormData = await req.json();
    const currentDate = new Date();
    await Promise.all(
      UpdateFormData.map(async (item) => {
        if (item.approval === "N") {
          await pool
            .request()
            .input("new_closed", sql.NVarChar, "R")
            .input("current_unicode", sql.NVarChar, item.unicode)
            .input("new_closeddate", sql.DateTime, currentDate).query(`
              UPDATE annualwelfare_POST_TEST
              SET closed = @new_closed,
              closed_date = @new_closeddate
              WHERE unicode = @current_unicode
          `);
        } else if (item.approval === "Y") {
          await pool
            .request()
            .input("new_closed", sql.NVarChar, "Y")
            .input("current_unicode", sql.NVarChar, item.unicode)
            .input("new_closeddate", sql.DateTime, currentDate).query(`
              UPDATE annualwelfare_POST_TEST
              SET closed = @new_closed,
              closed_date = @new_closeddate
              WHERE unicode = @current_unicode
          `);
        }
      })
    );
    return NextResponse.json({
      success: true,
      message: "Updated!!!",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error("Internal Server Error");
  }
}
