const mongoose = require("mongoose");

require("dotenv").config();

const uri = process.env.LOCAL_URI;

const mongoConnect = () => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const connection = mongoose.connection;
  connection
    .once("open", () => {
      console.log("MongoDB database connection established successfully");
    })
    .on("error", function (e) {
      console.log(e);
    });
};

module.exports = { mongoConnect };
