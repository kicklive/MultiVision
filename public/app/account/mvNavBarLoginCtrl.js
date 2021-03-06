angular
  .module("app")
  .controller("mvNavBarLoginCtrl", function(
    $scope,
    $http,
    mvIdentity,
    mvNotifier,
    mvAuth,
    $location
  ) {
    $scope.identity = mvIdentity;
    $scope.signin = function(username, password) {
      //goes to the mvAuth.js authenticateUser
      mvAuth.authenticateUser(username, password).then(function(success) {
        if (success) {
          mvNotifier.notify("You have successfully signed in!");
        } else {
          mvNotifier.notify("username/Password combination incorrect.");
        }
      });
    };
    //goes to the mvAuth.js logoutUser
    $scope.signout = function() {
      mvAuth.logoutUser().then(function() {
        $scope.username = "";
        $scope.password = "";
        mvNotifier.notify("You have successfully signed out!");
        $location.path("/");
      });
    };
  });
