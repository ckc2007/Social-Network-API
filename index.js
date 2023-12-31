// const express = require("express");
// const db = require("./config/connection");
// const routes = require("./routes");

// const cwd = process.cwd();

// const PORT = process.env.PORT || 3001;
// const app = express();

// // Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
// const activity = cwd.includes("Social-Network-API")
//   ? cwd.split("/Social-Network-API/")[1]
//   : cwd;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(routes);

// db.once("open", () => {
//   app.listen(PORT, () => {
//     console.log(`API server for ${activity} running on port ${PORT}!`);
//   });
// });

const express = require("express");
const { connectDB } = require("./config/db.js");
const routes = require("./routes");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();

// Set the public directory as a static folder to serve files (if needed)
// app.use(express.static(path.join(__dirname, "public")));

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
const activity = path.basename(__dirname);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Connect to MongoDB and start the server
connectDB(); // This will invoke the connectDB function in db.js

app.listen(PORT, () => {
  console.log(`API server for ${activity} running on port ${PORT}!`);
});
