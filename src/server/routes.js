var router = require('express').Router();
var four0four = require('./utils/404')();
var passport = require('passport');

router.get('/listings', getAllMotorcycles);
router.get('/listings/query', getSomeMotorcycles);
router.get('/listings/detail', getaMotorcycle);

router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    console.log(req.user.username);
    res.redirect('/dashboard');
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

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
