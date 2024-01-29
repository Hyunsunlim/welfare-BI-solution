const sql = require("mssql");

const pool = new sql.ConnectionPool({
  user: "bim",
  password: "!QAZxsw2",
  server: "TYLIN-DB\\SQLEXPRESS",
  database: "TYLIN_BIM",
  options: {
    encrypt: false,
  },
});

const connectToDB = async () => {
  try {
    await pool.connect();
    console.log("Connected to SQL Server");
    return pool;
  } catch (error) {
    console.error("Error connecting to SQL Server:", error.message);
    throw error;
  }
};

export { connectToDB, pool };
