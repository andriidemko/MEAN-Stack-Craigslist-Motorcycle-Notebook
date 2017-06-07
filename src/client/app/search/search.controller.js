(function() {
  'use strict';

  angular
    .module('app.search')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['$q', '$http', '$scope', 'clservice', 'cookies', 'logger'];
  /* @ngInject */
  function SearchController($q, $http, $scope, clservice, cookies, logger) {
    var vm = this;
    vm.news = {
      title: 'phillyMotoCraigslist',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };
    vm.searchListings = [];
    vm.query;
    vm.title = 'Search';
    vm.detail = {};
    $scope.motorcycle = '';

    activate();

    function activate() {
      vm.userName = cookies.get('authenticatedUser');
      logger.info('Activated Search Listings View');
    }

    $scope.assembleBike = function(url, price, cat) {
      vm.detail = {};
      $('#detailModal').modal({
        show: true
      });
      return clservice.getPost(url).then(function(data) {
        vm.detail = data;
        vm.detail.category = cat;
        vm.detail.price = price;
        vm.detail.authenticatedUser = vm.userName;
        return vm.detail;
      });
    }

    $scope.submitPost = function(obj) {
      $http.post('/api/posts/save', obj);
      logger.info('Saved Post.');
    }

    $scope.searchListings = function() {
      return clservice.searchListings($scope.motorcycle).then(function(data) {
        vm.query = $scope.motorcycle;
        vm.searchListings = data;
        return vm.searchListings, vm.query;
      });
    }

    vm.showURL = function(val) {
      if(isNaN(val)) {
        return false;
      }
      return true;
    }

    $scope.assembleMap = function(url) {
      var mapId = '';
      $http.get('/api/map').then(function(payload) {
        mapId = payload.data;
        return mapId;
      }).then(function(mapId) {
        var regex1 = new RegExp('@(.*),(.*),');
        var regex2 = new RegExp('[^=]*$');
        var coords1 = url.match(regex1);
        var coords2 = url.match(regex2);
        if (coords1) {
          vm.detail.mapPic = 'https://maps.googleapis.com/maps/api/staticmap?center=' + coords1[1] + ',' + coords1[2] + '&zoom=12&size=568x225&maptype=roadmap&key=' + mapId.id;
        } else {
          vm.detail.mapPic = 'https://maps.googleapis.com/maps/api/staticmap?center=' + coords2[1] + ',' + coords2[2] + '&zoom=12&size=568x225&maptype=roadmap&key=' + mapId.id;
        }
        return vm.detail.mapPic;
      });
    }

  }
})();
