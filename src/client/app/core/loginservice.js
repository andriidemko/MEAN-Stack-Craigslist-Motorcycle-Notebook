(function () {
  'use strict';

  angular
  .module('app.core')
  .factory('loginservice', loginservice);
  loginservice.$inject = ['$http', '$q', 'exception', 'logger'];

  function loginservice($http, $q, exception, logger) {
    var user = {
      userName: null
    };

    var service = {
      user: user,
      setUser: setUser,
      getUser: getUser
    };

    function setUser(userName){
      user.userName = userName;
      return user;
    }

    function getUser(){
      return user;
    }

    return service;
  }
})();
