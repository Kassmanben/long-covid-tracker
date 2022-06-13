const db = require('../models/database.js');

const new_rank = (req, res) => {
    if (!req.body.rank)
        return res.status(400).send("You must include a rank in the body");

    db.newRank(req.body.rank, req.body.note)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send("Could not create rank " + err))
}

const get_rank = (req, res) => {
    db.getRank()
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send("Could not retrieve rank data" + err))
}

const new_activity = (req, res) => {
    if (!req.body.name || !req.body.timesAllotted)
        return res.status(400).send("You must include a name and timesAllotted in the body");

    db.newActivity(req.body.name, req.body.timesAllotted)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send("Could not create activity " + err))
}

const get_activity = (req, res) => {
    db.getActivity()
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send("Could not retrieve activity data" + err))
}


module.exports = {
    new_rank: new_rank,
    get_rank: get_rank,
    new_activity: new_activity,
    get_activity: get_activity
}