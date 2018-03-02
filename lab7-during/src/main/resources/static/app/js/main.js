var app = angular.module("wafepa", ['ngRoute']);

app.controller("ctrl", function ($scope){
	
	$scope.appName = "Wafepa";

});

app.controller("activitiesCtrl", function($scope, $http){
	
	var baseUrl = "/api/activities";
	
	$scope.activities = [];
	
	var getActivities = function(){
		
		var promise = $http.get(baseUrl);
		
		promise.then(
			function uspeh(res){
				
				$scope.activites = res.data;
				
			},
			function neuspeh(res){
				alert("Something went wrong!");
			}
		);
		
		console.log("Test");
	}
	
	getActivities();
		
});


app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : '/app/html/home.html',
			controller: 'ctrl'
		})
		.when('/activities', {
			templateUrl : '/app/html/activities.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

