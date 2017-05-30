(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminController', AdminController, 'loginservice');

  AdminController.$inject = ['$q', 'loginservice', 'logger', '$state'];
  /* @ngInject */
  function AdminController($q, loginservice, logger, $state) {
    var vm = this;
    vm.title = 'Login';

    activate();

    function activate() {
      logger.info('Activated Admin/Login View');
    }

    // The model object that's reference
    // on the  element in admin.html
    vm.login = {};

    // An array of the form fields with configuration
    // and options set. I make reference to this in
    // the 'fields' attribute on the  element
    vm.loginFields = [
      {
        key: 'login',
        type: 'input',
        templateOptions: {
          type: 'email',
          label: 'Username',
          placeholder: 'Enter your email address',
          required: true
        }
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'Password',
          placeholder: 'Enter your password',
          required: true
        }
      }
    ];

    vm.user = {
      login: null,
      password: null
    };

    vm.goLogin = function () {

      console.log(vm.login);
      console.log(loginservice.setUser(vm.login.login));
      console.log(loginservice.getUser());

      // Allowed user email addresses
      var allowedUsers = [
        'zensmile@gmail.com'
      ];

      if (allowedUsers.indexOf(loginservice.getUser().userName) >= 0) {
        $state.go('dashboard');
      } else {
        logger.error('Access Denied.');
      }

    };

  }
})();
