require("dotenv").config();
const express = require("express");
const cors = require("cors");

const contentRoutes = require("./routes/contentRoutes");

const app = express();
const PORT = process.env.PORT;

app.use(cors()); // emable CORS for all routes
app.use(express.json()); // parse incoming JSON request 

app.use("/api", contentRoutes); // Mount API routes

// start server 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
