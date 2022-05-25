// code is shit

const express = require("express");
const app = express();
const morgan = require("morgan");
var bodyParser = require("body-parser");
/*
  EXPRESS
*/
app.use(morgan("short"));
app.use(
  bodyParser.json({
    limit: "10mb",
  })
);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

/*
  ROUTES
*/
app.use("/webhook", require("./routes/webhook.js"));

// EXPRESS PORT
const port = 3000;
/*
  START
*/
// init the db
require("./utils/db");

app.get("/", (req, res) => {
  res.status(200).send(":skull:");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
