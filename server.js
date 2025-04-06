const express = require("express");
const mongoose = require("mongoose");

const indexRouter = require("./src/routes/index");

const app = express();

// MongoDB connection
const mongoDB = process.env.MONGODB_URI || "mongodb://localhost:27017/local-lib";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`Received request for route: ${req.originalUrl}`);
  next(); // Continue to the next middleware/route handler
});

app.use("/api", indexRouter);

// Start server on port 3005
const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
