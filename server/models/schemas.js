const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/nodeapp";
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose
    .connect(MONGO_URI, mongoOptions)
    .then(() => console.log("Connected to mongo", MONGO_URI))
    .catch((e) => console.log(e));

const {Schema} = mongoose;

const Rank = new Schema({
    rank: {type: Number, required: true},
    note: {type: String, required: false},
    date: {type: Date, default: Date.now()},
});

const Activity = new Schema({
    name: {type: String, required: true},
    timesAllotted: {
        type: [{
            time: {type: Number, required: true},
            date: {type: Date, required: true}
        }]
    },
});

module.exports = {
    Rank: mongoose.model("Rank", Rank),
    Activity: mongoose.model("Activity", Activity)
};
