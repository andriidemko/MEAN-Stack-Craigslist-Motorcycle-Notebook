(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'loginservice', '$scope', 'clservice', 'logger'];
  /* @ngInject */
  function DashboardController($q, loginservice, $scope, clservice, logger) {
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
        return vm.detail;
      });
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

  }
})();
