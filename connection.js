const mongoose = require("mongoose");
mongoose.set("strictQuery",true);
async function connectMOngoDB(url) {
  return mongoose.connect(url);
}

module.exports = { connectMOngoDB };
