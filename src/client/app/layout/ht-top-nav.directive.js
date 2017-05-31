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

    TopNavController.$inject = ['$scope', 'cookies'];

    /* @ngInject */
    function TopNavController($scope, cookies) {
      var vm = this;
      vm.userName = cookies.get('authenticatedUser');
      $scope.isCollapsed = true;
    }

    return directive;
  }
})();
