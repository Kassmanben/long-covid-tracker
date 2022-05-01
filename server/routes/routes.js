const db = require('../models/database.js');

const new_data = (req, res) => {
  if (!req.body.rank)
    return res.status(400).send("You must include a rank in the body");

  db.newData(req.body.rank, req.body.note)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send("Could not create data " + err))
}

const get_data = (req, res) => {
  db.getData()
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send("Could not retrieve data " + err))
}


module.exports = {
  new_data,
  get_data
}