var router = require('express').Router();
var four0four = require('./utils/404')();
var passport = require('passport');
var Post = require('./data/postSchema');

////////////// Craigslist Endpoints

router.get('/listings', getAllMotorcycles);
router.get('/listings/query', getSomeMotorcycles);
router.get('/listings/detail', getaMotorcycle);

////////////// CRUD Endpoints

router.get('/posts/:user', getAllPosts);
router.get('/posts/find/:id', getaPost);
router.post('/posts/save', createaPost);
router.delete('/posts/delete/:id', deleteaPost);

////////////// Authentication Endpoints

// GitHub Authentication
router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    var detailedUser = 'gh-' + req.user.username;
    res.cookie('authenticatedUser', detailedUser, { expires: new Date(Date.now() + 100000000)});
    res.redirect('/dashboard');
  });

// Google Authentication
router.get('/auth/google',
  passport.authenticate('google', { scope: [ 'profile' ] }));
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    var detailedUser = 'go-' + req.user.id;
    res.cookie('authenticatedUser', detailedUser, { expires: new Date(Date.now() + 100000000)});
    res.redirect('/dashboard');
  });

// Logout
router.get('/logout', function(req, res){
  req.logout();
  res.clearCookie('authenticatedUser').redirect('/');
});

router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

////////////// Craigslist Functions

function getAllMotorcycles(req, res, next) {
  var
  craigslist = require('node-craigslist'),
  client = new craigslist.Client({
    city: 'philadelphia' // City Listings of CL
  }),
  options = {
    category: 'mca' // Motorcycles section of CL
  };

  client
    .list(options)
    .then((listings) => {
      res.status(200).send(listings);
    })
    .catch((err) => {
      console.error(err);
    });
}

function getSomeMotorcycles(req, res, next) {
  var
  craigslist = require('node-craigslist'),
  client = new craigslist.Client({
    city: 'philadelphia' // City Listings of CL
  }),
  options = {
    category: 'mca' // Motorcycles section of CL
  };

  client
    .search(options, req.query.motorcycle)
    .then((listings) => {
      res.status(200).send(listings);
    })
    .catch((err) => {
      console.error(err);
    });
}

function getaMotorcycle(req, res, next) {
  var
  craigslist = require('node-craigslist'),
  client = new craigslist.Client({
    city: 'philadelphia' // City Listings of CL
  }),
  options = {
    category: 'mca' // Motorcycles section of CL
  };

  client
    .search(options)
    .then((listings) => client.details(req.query.url))
    .then((details) => {
      res.status(200).send(details);
    })
    .catch((err) => {
      console.error(err);
    });
}

////////////// CRUD Functions

function getAllPosts(req, res) {
  var user = req.params.user;
  Post.find({"authenticatedUser": user}, function(err, posts) {
    if (err) throw err;
    res.send(posts);
  });
};

function getaPost(req, res) {
  var id = req.params.id;
  Post.find({"_id": id}, function(err, post) {
    if (err) throw err;
    res.send(post);
  });
};

function createaPost(req, res) {
  var newPost = new Post(req.body);
  newPost.save(function(err, createdPostObj) {
    if (err) throw err;
    res.send(createdPostObj);
  });
};

function deleteaPost(req, res) {
  var id = req.params.id;
  Post.findByIdAndRemove(id, function(err, post) {
    if (err) throw err;
    res.send(post);
  });
};
