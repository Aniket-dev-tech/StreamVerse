const express = require("express");
const path = require("path");
require('dotenv').config();
const videoRoutes = require("./routes/videos");

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set("view engine", "ejs");

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", videoRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
