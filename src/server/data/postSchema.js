// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var postSchema = new Schema({
  pid: String,
  title: String,
  description: String,
  images: String,
  mapUrl: String,
  price: String,
  postedAt: String,
  createdAt: Date,
  authenticatedUser: String
});

// the schema is useless so far
// we need to create a model using it
var Post = mongoose.model('Post', postSchema);

// make this available to our users in our Node applications
module.exports = Post;
