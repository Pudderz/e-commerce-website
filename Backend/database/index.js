const mongoose = require("mongoose");
require("dotenv").config();

const uri = `mongodb+srv://dbAdmin:${process.env.MONGODB_PASSWORD}@cluster0.s5qsx.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;

let db = null;

const startDatabase = () => {
  if (db !== null) return db;

  console.log("connecting to the database");
  db = mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("db connection is okay");

        // if (!database) {
        //   console.log("no database set");
        // }
      }
    }
  );
  return db;
};

mongoose.connection.on("error", (err) => {
  db = null;
});

module.exports = { startDatabase };
