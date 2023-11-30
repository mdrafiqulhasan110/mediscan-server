const express = require("express");
const connectDB = require("./src/DataBase/connectDB");
const handleUser = require("./src/Routes/handleUser");
const handleBanner = require("./src/Routes/handleBanner");
const handleToken = require("./src/Routes/handleToken");
const handleAdmin = require("./src/Routes/handleAdmin");
const handleTest = require("./src/Routes/handleTest");
const handleReservation = require("./src/Routes/handleReservation");

var cors = require("cors");
var app = express();

app.use(cors());
const port = 5000;
app.use(express.json());

//Routes

app.use("/user", handleUser);
app.use("/banner", handleBanner);
app.use("/reservation", handleReservation);
app.use("/test", handleTest);
app.use("/jwt", handleToken);
app.use("/", handleAdmin);

// error handling middleware
app.all("*", (req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on the server`);
  error.status = 404;
  next(error);
});

app.use((err, _req, res, _next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

// Main Function
const main = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

main();
