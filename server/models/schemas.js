const mongoose = require('mongoose');


const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/nodeapp";
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(MONGO_URI, mongoOptions)
  .then(() => console.log("Connected to mongo", MONGO_URI))
  .catch((e) => console.log(e));

const { Schema } = mongoose;

const Data = new Schema({
  text: { type: String, required: true },
  date: { type: Date, default: Date.now() }
})

module.exports = { Data: mongoose.model('Data', Data) };
