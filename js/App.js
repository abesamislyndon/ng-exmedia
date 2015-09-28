var exApp = angular.module('exmediaApp', ['ngRoute', 'duScroll']);

exApp.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
$routeProvider.when("/", {templateUrl:"partials/home.html", controller: "homeController"});
}]);


exApp.controller("homeController", function($scope, $document){
		var section3 = function(){
			$document.scrollToElementAnimated(section3);
		}
}).value('duScrollOffset', 30);



exApp.controller('FormController',function($scope, $http) {
  $scope.formData = {};
  $scope.submission = false;
  var param = function(data) {
        var returnString = '';
        for (d in data){
            if (data.hasOwnProperty(d))
               returnString += d + '=' + data[d] + '&';
        }
        return returnString.slice( 0, returnString.length - 1 );
  };
  $scope.submitForm = function() {
    $http({
    method : 'POST',
    url : 'http://beta.exhibitmedia.sg/process.php',
    data : param($scope.formData), // pass in data as strings
    headers : { 'Content-Type': 'application/x-www-form-urlencoded' } // set the headers so angular passing info as form data (not request payload)
  })
    .success(function(data) {
      if (!data.success) {
	       $scope.errorName = data.errors.name;
	       $scope.errorEmail = data.errors.email;
	       $scope.errorTextarea = data.errors.message;
	       $scope.submissionMessage = data.messageError;
	       $scope.submission = true; //shows the error message
	  } else {
       $scope.submissionMessage = data.messageSuccess;
       $scope.formData = {}; // form fields are emptied with this line
       $scope.submission = true; //shows the success message
      }
     });
   };
});


