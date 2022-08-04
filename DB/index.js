const mongoose = require("mongoose");

module.exports.DBconnection = () => {
  mongoose
    .connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};
