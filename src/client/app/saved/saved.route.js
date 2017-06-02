(function() {
  'use strict';

  angular
    .module('app.saved')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'saved',
        config: {
          url: '/saved',
          templateUrl: 'app/saved/saved.html',
          controller: 'SavedController',
          controllerAs: 'vm',
          title: 'saved',
          settings: {
            nav: 4,
            content: '<i class="fa fa-floppy-o"></i> Saved Listings'
          }
        }
      }
    ];
  }
})();
