(function() {
  'use strict';

  angular
    .module('app.saved')
    .controller('SavedController', SavedController);

  SavedController.$inject = ['$q', '$http', 'savedservice', '$scope', 'cookies', 'logger'];
  /* @ngInject */
  function SavedController($q, $http, savedservice, $scope, cookies, logger) {
    var vm = this;
    vm.news = {
      title: 'phillyMotoCraigslist',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };
    vm.listings = [];
    vm.bike = {};
    vm.title = 'Saved Listings';
    vm.userName = cookies.get('authenticatedUser');
    activate();

    function activate() {
      var promises = [getListings()];
      return $q.all(promises).then(function() {
        logger.info('Activated Saved Listings View');
      });
    }

    $scope.showBike = function(id) {
      vm.bike = {};
      $('#savedDetailModal').modal({
        show: true
      });
      return savedservice.getPost(id).then(function(data) {
        vm.bike = data[0];
        return vm.bike;
      });
    }

    function getListings() {
      return savedservice.getListings(vm.userName).then(function(data) {
        vm.listings = data;
        return vm.listings;
      });
    }

    $scope.deleteSaved = function(id) {
      var r = confirm("Are you sure you want to permanently delete this saved post?");
        if (r == true) {
        $http.delete('/api/posts/delete/' + id);
        logger.info('Deleted Post.');
        getListings();
      }
    }

    $scope.updateNotes = function(id, note) {
      var fixedNote = {"note":note};
      $http.put('/api/posts/update/' + id, fixedNote);
      logger.info('Saved Post Note.');
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
          vm.bike.mapPic = 'https://maps.googleapis.com/maps/api/staticmap?center=' + coords1[1] + ',' + coords1[2] + '&zoom=12&size=568x225&maptype=roadmap&key=' + mapId.id;
        } else {
          vm.bike.mapPic = 'https://maps.googleapis.com/maps/api/staticmap?center=' + coords2[1] + ',' + coords2[2] + '&zoom=12&size=568x225&maptype=roadmap&key=' + mapId.id;
        }
        return vm.bike.mapPic;
      });
    }

  }
})();
