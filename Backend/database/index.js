const mongoose = require("mongoose");
require("dotenv").config();

const uri = `mongodb+srv://dbAdmin:${process.env.MONGODB_PASSWORD}@cluster0.s5qsx.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;

let db = null;

const startDatabase = () => {
  console.log('conection ', mongoose.connection.readyState)
  if(mongoose.connection.readyState === 1) return
  // if (db !== null) return db;

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
  console.log("mongoose connection error")
  console.log(err)
  db = null;
});

module.exports = { startDatabase };
