const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const UsersRoutes = require("./app/routes/UsersRoutes");

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models/Index");
// db.sequelize.sync();
// drop the table if it already exists
db.sequelize.sync({ force: true, logging: console.log }).then(() => {
  console.log("Drop and re-sync db.");
});

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });

require("./app/routes/turorial.routes")(app);
// require("./app/routes/UsersRoutes")(app);
app.use("/api/users/", UsersRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 are live on ${PORT}`);
});
