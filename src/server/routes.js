var router = require('express').Router();
var four0four = require('./utils/404')();

router.get('/listings', getAllMotorcycles);
router.get('/listings/query', getSomeMotorcycles);
router.get('/listings/detail', getaMotorcycle);
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
