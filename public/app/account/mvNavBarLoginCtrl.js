angular.module("app").controller("mvNavBarLoginCtrl", function($scope, $http) {
  $scope.signin = function(username, password) {
    //goes to the route.js app.post
    $http
      .post("/login", {username: username, password: password})
      .then(function(response) {
        if (response.data.success) {
          console.log("logged in");
        } else {
          console.log(response.data.success);
        }
      });
  };
});
