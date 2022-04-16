const mongoose = require('mongoose');


const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/nodeapp";
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongo", MONGO_URI))
  .catch(console.log);
// mongoose.set('useFindAndModify', false);

const { Schema } = mongoose;

const Post = new Schema({
  text: { type: String, required: true },
  timestamp: Number, // a unix timestamp of the post time
})

module.exports = { Post: mongoose.model('Post', Post) };
