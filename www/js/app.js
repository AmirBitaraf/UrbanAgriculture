// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter',['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider ) {
  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: 'index.html',
    controller: "QuestionsCtrl"
  })
  .state('result', {
    url: '/result',
    templateUrl: 'result.html',
    controller: "ResultCtrl"
  });
  $urlRouterProvider.otherwise('/');
})

.controller('QuestionsCtrl', function($scope, $location, $http, $state, $rootScope) {
    {
        // Use our scope for the scope of the modal to keep it simple
      $scope.navigateToNext = function() {

            var link = 'http://amirbitaraf.ir/urban/';
            console.log($scope.location);
            $http.post(link, {
              budget: $scope.budget.select,
              light: $scope.light.select,
              location: $scope.location
              }).then(function (res){
                $rootScope.res = res.data;
                $state.go('result');
            },function(err){
              console.log(err);
              alert("An Error Occured Connecting to Server!");
              $scope.btn.btnClick=false;
            });
       };

       var cc = require('country-city');

       $scope.countries = cc.getCountries();
       $scope.cities = cc.getCities($scope.countries[0]);
       $scope.location = {};
       $scope.budget = {};
       $scope.light = {};
       $scope.btn = {};
       $scope.gps = {};

       $scope.changeCity = function(newVal){
         console.log(newVal);
         $scope.cities = cc.getCities(newVal);
         $scope.location.city = $scope.cities[0];
       };


      	$scope.getLocation = function(){
       		console.log("clicked");
			var posOptions = {timeout: 10000, enableHighAccuracy: false};
			navigator.geolocation
			.getCurrentPosition(
			function (position) {
				var lat  = position.coords.latitude
				var long = position.coords.longitude

				$scope.location.lat = lat;
        $scope.location.long = long;
			},function(err){
          alert("An Error Occured Getting GPS Data.");
          $scope.gps.gps = false;
			},posOptions);
		};
    }
})
.controller('ResultCtrl', function($scope, $location, $state, $rootScope) {
    {
      $scope.result = {
        html : $rootScope.res
      }
    }
})
