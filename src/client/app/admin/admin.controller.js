(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminController', AdminController, );

  AdminController.$inject = ['$q', 'logger', '$state', 'cookies'];
  /* @ngInject */
  function AdminController($q, logger, $state, cookies) {
    var vm = this;
    vm.title = 'Login';
    vm.userName = cookies.get('authenticatedUser');

    activate();

    function activate() {
      logger.info('Activated Admin/Login View');
    }
  }
})();
