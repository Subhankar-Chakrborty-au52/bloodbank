// importing dependencies
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const initdb = require("./config/dbconnect");
const app = express();
const path = require("path");
initdb();

// middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/auth", require("./routes/authroutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

// STATIC FOLDER
// app.use(express.static(path.join(__dirname, "./client/build")));

// STATIC ROUTES
// app.get('*' , function(req, res){
//     res.sendFile.path.join(__dirname , './client/build/index.html');
// })

// app.get('*', function(req, res){
//     res.sendFile(path.join(__dirname, './client/build/index.html'));
// })

// Port and Server starting
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} Mode on Port ${process.env.PORT}`
  );
});
