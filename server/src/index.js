import express from "express";
import workoutRoutes from "./routes/workout.route.js";
import authRoutes from "./routes/auth.route.js";
import connectDB from "./DB/db.js";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve(); 

dotenv.config(); //loads the variables from .env file into process.env

// Connect to MongoDB
connectDB();


app.use(express.urlencoded({ extended: true })); // For data parse (x-www-form-urlencoded)
app.use(express.json()); // For JSON data
app.use(cookieParser()); // Enables cookie handling

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Frontend URLs
    credentials: true, // sending cookies
  })
);

app.use("/wt",workoutRoutes);
app.use("/wt/auth",authRoutes);  

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}


app.listen(PORT,()=>{
    console.log("Server Listening at port:",PORT);
});