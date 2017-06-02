(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('savedservice', savedservice);

  savedservice.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function savedservice($http, $q, exception, logger) {
    var service = {
      getListings: getListings,
      getPost: getPost
    };

    return service;

    // Get ALL Saved Listings
    function getListings(user) {
      return $http.get('/api/posts/' + user)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getListings')(e);
      }
    }

    // Get Specific Post
    function getPost(id) {
      return $http.get('/api/posts/find/' + id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for get detail post')(e);
      }
    }

  }
})();
