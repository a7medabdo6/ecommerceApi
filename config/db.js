const mongoose = require("mongoose");
const config = require("config");
const mongorui = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(mongorui, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
    });
    console.log("Mongodb Connected...");
  } catch (e) {
    console.error(e.message);
    //Exit process with failure
    process.exit(1);
  }
};
module.exports = connectDB;
