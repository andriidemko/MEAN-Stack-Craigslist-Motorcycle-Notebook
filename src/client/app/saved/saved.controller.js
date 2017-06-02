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

  }
})();
