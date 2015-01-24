ngModule('yatayat.factories')

.factory('Raven', ['$http', '$q', function($http, $q) {
  // var baseUrl = 'http://192.168.56.1:3000/';
  var baseUrl = 'http://localhost:3000/';
  // var baseUrl = 'http://0.0.0.0:3000/';
  // var baseUrl = 'http://yatayat.herokuapp.com/';
  return {
    get: function(path) {
      var defer = $q.defer();

      $http({
        url: baseUrl + path,
        method: 'GET'
      }).then(function(result) {
        defer.resolve(result.data);
      }, function() {
        defer.reject();
      });

      return defer.promise;
    },

    post: function(path, data) {
      var defer = $q.defer();

      $http({
        url: baseUrl + path,
        method: 'POST',
        data: $.param(data),
      }).then(function(result) {
        defer.resolve(result.data);
      }, function() {
        defer.reject();
      });

      return defer.promise;
    }
  }
}])

