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

    // var map = 'https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=14&size=568x225&maptype=roadmap&key=YOUR_API_KEY'


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
        var mapApiUrl = '';
        if (vm.detail.mapUrl != null) {
          mapApiUrl = assembleMap(vm.detail.mapUrl);
          vm.detail.mapPic = mapApiUrl;
        }
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

    function assembleMap(url) {
      var regex1 = new RegExp('@(.*),(.*),');
      var regex2 = new RegExp('[^=]*$');
      var coords1 = url.match(regex1);
      var coords2 = url.match(regex2);
      var promise = $http.get('/api/map');
      var mapId = {};
      promise.then(function(payload) {
        $scope.mapId = payload.data;
        return $scope.mapId;
        console.log($scope.mapId);
      });

      if (coords1) {
        var map = 'https://maps.googleapis.com/maps/api/staticmap?center=' + coords1[0] + '&zoom=14&size=568x225&maptype=roadmap&key=';
      } else {
        var map = 'https://maps.googleapis.com/maps/api/staticmap?center=' + coords2 + '&zoom=14&size=568x225&maptype=roadmap&key=';
      }
      console.log(map);
      return map;
    }

  }
})();
