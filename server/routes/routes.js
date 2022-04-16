const db = require('../models/database.js');

const new_post = (req, res) => {
  if (!req.body.text)
    return res.status(400).send("You must include a post in the body");

  db.newPost(req.body.text)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send("Could not create post " + err))
}

const get_posts = (req, res) => {
  db.getPosts()
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send("Could not retrieve posts " + err))
}


module.exports = {
  new_post,
  get_posts
}