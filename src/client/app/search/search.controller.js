(function() {
  'use strict';

  angular
    .module('app.search')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['$q', '$scope', 'clservice', 'logger'];
  /* @ngInject */
  function SearchController($q, $scope, clservice, logger) {
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
      logger.info('Activated Search Listings View');
    }

    $scope.assembleBike = function(url, price) {
      vm.detail = {};
      $('#detailModal').modal({
        show: true
      });
      return clservice.getPost(url).then(function(data) {
        vm.detail = data;
        vm.detail.price = price;
        return vm.detail;
      });
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

  }
})();
