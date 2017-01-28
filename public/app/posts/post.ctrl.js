'use strict';

angular.module('NodeGeeks')
.controller('PostCtrl', function ($scope,$state,$http, Posts){
  $scope.newPost = {};
  $scope.posts = [];

  Posts.fetch(function(err,data){
    if(err) return console.log(err);
    $scope.posts = data;
    console.log(data);
  })
  $scope.addPost = function(){
    console.log($scope.newPost);
  }

});
