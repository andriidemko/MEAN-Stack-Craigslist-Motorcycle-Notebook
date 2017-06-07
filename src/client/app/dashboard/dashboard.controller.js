(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', '$http', '$scope', 'savedservice', 'clservice', 'cookies', 'logger'];
  /* @ngInject */
  function DashboardController($q, $http, $scope, savedservice, clservice, cookies, logger) {
    var vm = this;
    vm.news = {
      title: 'phillyMotoCraigslist',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };
    vm.listings = [];
    vm.title = 'New Listings';
    vm.detail = {};

    activate();

    function activate() {
      var promises = [getListings()];
      return $q.all(promises).then(function() {
        vm.userName = cookies.get('authenticatedUser');
        logger.info('Activated New Listings View');
      });
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

    function getListings() {
      return clservice.getListings().then(function(data) {
        vm.listings = data;
        return vm.listings;
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
