import { connectToDB, pool } from "../../../../db/dbConfig";
import { NextResponse } from "next/server";
import sql from "mssql";

export async function POST(req) {
  try {
    await connectToDB();
    const data = await req.json();
    const { loginid, password } = data;

    const SQL = "SELECT * FROM user_Info WHERE LOGIN_ID = @loginid";
    const sqlResult = await pool
      .request()
      .input("loginid", sql.NVarChar, loginid)
      .query(SQL);

    // console.log("test", sqlResult.recordset[0]);
    if (sqlResult.recordset.length === 0) {
      return NextResponse.json({
        success: false,
        message: "ID is not found",
      });
    }
    const storedPassword = sqlResult.recordset[0].Password;
    let user_Info = sqlResult.recordset[0];
    if (password === storedPassword) {
      return NextResponse.json({
        success: true,
        message: "Login successful",
        user_Info,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
