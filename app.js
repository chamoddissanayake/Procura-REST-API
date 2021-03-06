var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

const dbCon = require("./utils/db_Connection");

var indexRouter = require("./routes/index");
var RequisitionRouter = require("./routes/RequisitionRouter");
var SiteManagerRouter = require("./routes/SiteManagerRouter");
var ItemRouter = require("./routes/ItemRouter");
var SettingsRouter = require("./routes/SettingsRouter");
var SupplierRouter = require("./routes/SupplierRouter");

var mongoose = require("mongoose");

var url = dbCon.mongoURIConnString.toString();
// mongoose.connect('mongodb+srv://admin:Y7V13akH6fjMidc6@cluster-procuradb.pihut.mongodb.net/procura-db?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB!");
});

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/siteManager", SiteManagerRouter);
app.use("/requisition", RequisitionRouter);
app.use("/item", ItemRouter);
app.use("/settings", SettingsRouter);
app.use("/supplier", SupplierRouter);


var cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
const PORT = 8000;
app.listen(PORT, () => {
  console.log("Server listening on port :" + PORT);
});

module.exports = app;
