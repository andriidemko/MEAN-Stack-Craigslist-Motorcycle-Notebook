/* jshint -W117, -W030 */
describe('saved routes', function() {
  describe('state', function() {
    var view = 'app/saved/saved.html';

    beforeEach(function() {
      module('app.saved', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should map state saved to url / ', function() {
      expect($state.href('saved', {})).to.equal('/');
    });

    it('should map /saved route to saved View template', function() {
      expect($state.get('saved').templateUrl).to.equal(view);
    });

    it('of saved should work with $state.go', function() {
      $state.go('saved');
      $rootScope.$apply();
      expect($state.is('saved'));
    });
  });
});
