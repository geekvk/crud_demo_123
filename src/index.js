import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import { createUserTable } from "./data/createUserTable.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());
// error handling middleware
app.use(errorHandler);

createUserTable(); // Create users table if it doesn't exist

// routes
app.use("/api/v1/users", userRoutes);



app.get("/test", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM current_database()");
        res.send(`Current database name is ${result.rows[0].current_database}`);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}); 


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});