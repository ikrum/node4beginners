angular.module('NodeGeeks')
.service('Posts', function($cookies,$http,$state) {
	this.posts = {};
  var header = {
    headers: {
      'Content-Type': 'application/json',
      'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImVtYWlsIjoiaWtydW0uYmRAZ21haWwuY29tIiwiZnVsbF9uYW1lIjoiSWtydW0gSG9zc2FpbiIsInN0YXR1cyI6IklOQUNUSVZFIiwiaWF0IjoxNDg1NTk4NDMyLCJleHAiOjE0ODU2ODQ4MzJ9.ob-ykAruHmaM48fHkWzdTL9RE_jjTvK7vANHp9FPznI'
    }
  }

	this.add = function(opts, callback){
		var endpoint = "/api/posts/";
		var doc = this;
		var cb = callback || angular.noop;

		$http.post(endpoint,opts,header).success(function(response){
      	cb(false,response);
    }).error(function(err){
      	cb(err);
    });
	}

	this.fetch=function(callback){

		var endpoint = "/api/posts/";
		var doc = this;
		var cb = callback || angular.noop;
		return $http.get(endpoint,header).then(function(response){
        cb(false, response.data);
    },function(err){
        cb(err);
    });
	}
});
