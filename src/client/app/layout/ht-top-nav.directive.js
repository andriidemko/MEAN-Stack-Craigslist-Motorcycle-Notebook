(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('htTopNav', htTopNav);

  /* @ngInject */
  function htTopNav() {
    var directive = {
      bindToController: true,
      controller: TopNavController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
        'navline': '='
      },
      templateUrl: 'app/layout/ht-top-nav.html'
    };

    TopNavController.$inject = ['$scope', 'loginservice'];

    /* @ngInject */
    function TopNavController($scope, loginservice) {
      var vm = this;
      vm.userName = loginservice.getUser();
      $scope.isCollapsed = true;
    }

    return directive;
  }
})();
