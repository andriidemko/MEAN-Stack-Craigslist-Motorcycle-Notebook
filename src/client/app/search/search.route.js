(function() {
  'use strict';

  angular
    .module('app.search')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'search',
        config: {
          url: '/search',
          templateUrl: 'app/search/search.html',
          controller: 'SearchController',
          controllerAs: 'vm',
          title: 'search',
          settings: {
            nav: 3,
            content: '<i class="fa fa-search"></i> Search Listings'
          }
        }
      }
    ];
  }
})();
