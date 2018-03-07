var app = angular.module("wafepa", ['ngRoute']);

app.controller("ctrl", function ($scope){
	
	$scope.appName = "Wafepa";

});

app.controller("activitiesCtrl", function($scope, $http, $location){
	
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
	}
	
	getActivities();
		
	$scope.goToAdd = function(){
		$location.path("/activities/add");
	}
	
	$scope.goToEdit = function(id){
		$location.path("/activities/edit/" + id);
	}
	
	$scope.delete = function(id){
		
		var promise = $http.delete(baseUrl + "/" + id);
		promise.then(
			function success(res){
				getActivities();
			},
			function error(res){
				alert("Something went wrong!");
			}
		)
	}
	
});

app.controller("addActivityCtrl", function($scope, $http, $location){
	
	var baseUrl = "/api/activities";
	
	$scope.newActivity = {};
	$scope.newActivity.name = "";
	
	$scope.add = function(){
		
		$http.post(baseUrl, $scope.newActivity).then(
			function success(res){
				$location.path("/activities");
			},
			function error(res){
				alert("Something went wrong.");
			}
		);
		
	}
	
});

app.controller("editActivityCtrl", function($scope, $http, $routeParams, $location){
	
	//console.log($routeParams);
	var id = $routeParams.aid;
	var baseUrl = "/api/activities/";
	
	$scope.oldActivity = {};
	$scope.oldActivity.name = "";
	
	var getActivity = function(){
		
		$http.get(baseUrl + id).then(
			function success(res){
				$scope.oldActivity = res.data;
			},
			function error(res){
				alert("Something went wrong!");
			}
		);
	}
	
	getActivity();
	
	$scope.edit = function(){
		$http.put(baseUrl + id, $scope.oldActivity).then(
			function success(res){
				$location.path("/activities");
			},
			function error(res){
				alert("Something went wrong!");
			}
		);
	}
	
});


app.controller("standoviCtrl", function($scope, $http){
	
	var baseUrlSt = "/api/standovi";
	var baseUrlSajam = "/api/sajmovi";
	
	$scope.standovi = [];
	$scope.sajmovi = [];
	
	$scope.noviStand = {};
	$scope.noviStand.zakupac = "";
	$scope.noviStand.povrsina = "";
	$scope.noviStand.sajamId = "";
	
	
	var getStandovi = function(){
		
		$http.get(baseUrlSt).then(
			function success(res){
				$scope.standovi = res.data;
			},
			function error(res){
				alert("Something went wrong!");
			}
		);
	}
	
	var getSajmovi = function(){
		$http.get(baseUrlSajam).then(
			function success(res){
				$scope.sajmovi = res.data;
				console.log($scope.sajmovi);
			},
			function error(res){
				alert("Something went wrong!");
			}
		);
	}
	
	getStandovi();
	getSajmovi();
	
	$scope.add = function(){
		
		$http.post(baseUrlSt, $scope.noviStand).then(
			function success(res){
				getStandovi();
			},
			function error(res){
				alert("Something went wrong!");
			}
		);
	}
	
	$scope.changeHappened = function(){
		alert("It did!");
	}
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
		.when('/activities/add', {
			templateUrl : '/app/html/add-activity.html'
		})
		.when('/activities/edit/:aid', {
			templateUrl : '/app/html/edit-activity.html'
		})
		.when('/standovi', {
			templateUrl : '/app/html/standovi.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

