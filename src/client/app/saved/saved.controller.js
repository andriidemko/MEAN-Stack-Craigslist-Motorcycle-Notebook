(function() {
  'use strict';

  angular
    .module('app.saved')
    .controller('SavedController', SavedController);

  SavedController.$inject = ['$q', 'savedservice', '$scope', 'cookies', 'logger'];
  /* @ngInject */
  function SavedController($q, savedservice, $scope, cookies, logger) {
    var vm = this;
    vm.news = {
      title: 'phillyMotoCraigslist',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };
    vm.listings = [];
    vm.title = 'Saved Listings';
    vm.userName = cookies.get('authenticatedUser');
    activate();

    function activate() {
      var promises = [getListings()];
      return $q.all(promises).then(function() {
        logger.info('Activated Saved Listings View');
      });
    }

    function getListings() {
      return savedservice.getListings(vm.userName).then(function(data) {
        vm.listings = data;
        console.log(vm.listings);
        return vm.listings;
      });
    }

    vm.showURL = function(val) {
      if(isNaN(val)) {
        return false;
      }
      return true;
    }

  }
})();
