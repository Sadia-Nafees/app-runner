const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD, // replace with your password
  port: process.env.DB_PORT,
});

// Middleware to parse JSON
app.use(express.json());

// API 1: Get all items
app.get("/api/items", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM items");
    res.status(200).json({ success: true, data: result.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Error retrieving items" });
  }
});

// API 2: Get item by ID
app.get("/api/items/:id", async (req, res) => {
  const itemId = parseInt(req.params.id, 10);

  // Validate item ID
  if (isNaN(itemId)) {
    return res.status(400).json({ success: false, message: "Invalid item ID" });
  }

  try {
    const result = await pool.query("SELECT * FROM items WHERE id = $1", [
      itemId,
    ]);

    if (result.rows.length > 0) {
      res.status(200).json({ success: true, data: result.rows[0] });
    } else {
      res.status(404).json({ success: false, message: "Item not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Error retrieving item" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
