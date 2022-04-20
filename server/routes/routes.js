const db = require('../models/database.js');

const new_data = (req, res) => {
  if (!req.body.text)
    return res.status(400).send("You must include a data in the body");

  db.newData(req.body.text)
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