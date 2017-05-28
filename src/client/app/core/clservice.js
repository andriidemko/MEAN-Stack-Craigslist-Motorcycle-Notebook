(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('clservice', clservice);

  clservice.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function clservice($http, $q, exception, logger) {
    var service = {
      getListings: getListings,
      searchListings: searchListings,
      getPost: getPost
    };

    return service;

    // Get ALL Listings
    function getListings() {
      return $http.get('/api/listings')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getListings')(e);
      }
    }

    // Get QUERY Listings
    function searchListings(whatever) {
      return $http.get('/api/listings/query/?motorcycle=' + whatever)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for searchListings')(e);
      }
    }

    // Get Specific Post
    function getPost(url) {
      return $http.get('/api/listings/detail/?url=' + url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for searchListings')(e);
      }
    }

  }
})();
