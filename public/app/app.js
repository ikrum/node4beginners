var app = angular.module('NodeGeeks', ['ui.router','ngCookies']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/404');

    $stateProvider
      .state('home',{
        url: '/home',
        templateUrl: 'app/posts/post.html',
        controller: 'PostCtrl',
    });

    $stateProvider
      .state('404',{
        url: '/404',
        templateUrl: 'app/errors/404.html',
    });

});

app.run(function($rootScope, $state){
  $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams, error){
    console.log("error");
  });
})
