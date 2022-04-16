const moment = require('moment');
const { Post } = require('./schemas.js');

const newPost = text => {
  console.log(text)
  const postObject = {
    text,
    timestamp: moment().unix()
  }
  const post = new Post(postObject)
  return post.save()
}

const getPosts = () => {
  return Post.find()
}


module.exports = { newPost, getPosts }