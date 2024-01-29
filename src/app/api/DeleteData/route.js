import { connectToDB, pool } from "../../../../db/dbConfig";
import { NextResponse } from "next/server";
import sql from "mssql";

export const dynamic = "force-dynamic";

export async function PATCH(req) {
  try {
    const connection = await connectToDB();
    const UpdateFormData = await req.json();

    console.log(UpdateFormData);
    await pool
      .request()
      .input("new_delflag", sql.Int, 1)
      .input("current_unicode", sql.NVarChar, UpdateFormData.unicode)
      .query(
        `UPDATE annualwelfare_POST_TEST
            SET del_flag = @new_delflag
            WHERE
              unicode = @current_unicode`
      );

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
