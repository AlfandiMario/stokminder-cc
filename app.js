const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 3000;

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "stokminder",
});

app.use(bodyParser.json());

/* 
  API untuk tambah daftar produk
*/
app.post("/api/add-product", (req, res) => {
  const { name, category } = req.body;

  // You may want to validate the input data before proceeding

  // Use the MySQL connection pool to execute a query
  pool.execute("INSERT INTO products (name, category) VALUES (?, ?)", [name, category], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    else{
      return res.status(201).json({ message: "Data successfully added!" });
    }
  });
  // res.setHeader("Content-Type", "application/json");
});

/* 
  API untuk tambah stok produk
*/
app.post("/v1/:id_user/:tanggal/add-stok", (req, res) => {
  const { name, category } = req.body;

  // You may want to validate the input data before proceeding

  // Use the MySQL connection pool to execute a query
  pool.execute("INSERT INTO products (name, category) VALUES (?, ?)", [name, category], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Respond with the ID of the inserted product
    res.status(201).json({ message: "Data successfully added!" }).end();
  });
});

app.get("/data", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute("SELECT * FROM products");
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
