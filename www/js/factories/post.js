module('yatayat.factories')

.factory('Post', ['BaseModel', 'Raven', '$q', function(BaseModel, Raven, $q) {

  return angular.extend(BaseModel, {
    all: function() {
      var defer = $q.defer();
      var data = [];

      Raven.get('posts')
      .then(function(posts) {
        angular.forEach(posts, function(post) {
          data.push(BaseModel.build(post));
        });
        defer.resolve(data);
      }, function() {
        defer.reject();
      });

      return defer.promise;
    },

    get: function(id) {
      var defer = $q.defer();

      Raven.get('posts/' + id)
      .then(function(post) {
        defer.resolve(BaseModel.build(post));
      }, function() {
        defer.reject();
      });

      return defer.promise;
    },

    create: function(options) {

    },

    length: function() {
      return this.body.length;
    }
  }); // end angular.extend..
}])

