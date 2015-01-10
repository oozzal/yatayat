module('yatayat.controllers')

.controller('PostsCtrl', ['$scope', '$rootScope', 'Post', function($scope, $rootScope, Post) {
  Post.all()
  .then(function(data) {
    $scope.posts = data;
  });

  $scope.likePost = function($index, $event) {
    $event.preventDefault();
    var post = $scope.posts[$index];
    Post.like(post.id, $rootScope.simSerialNumber)
    .then(function() {
      post.cached_votes_up = post.cached_votes_up + 1;
      post.liked = true;
    });
  };

  $scope.dislikePost = function($index, $event) {
    $event.preventDefault();
    var post = $scope.posts[$index];
    Post.like(post.id, $rootScope.simSerialNumber)
    .then(function() {
      post.cached_votes_down = post.cached_votes_down + 1;
      post.disliked = true;
    });
  };

  $scope.editPost = function($index, $event) {
    $event.preventDefault();
  };
}])

