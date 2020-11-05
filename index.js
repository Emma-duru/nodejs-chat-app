//  requiring packages
const express = require("express");
const app = express();
let randomColor = require("randomcolor");
const uuid = require("uuid");

// middleware
app.use(express.static("public"));

// routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Listen on port 3000
const server = app.listen(process.env.PORT || 3000);
