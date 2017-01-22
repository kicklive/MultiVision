angular.module("app", ["ngResource", "ngRoute"]);
angular.module("app").config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
    .when("/", {templateUrl: "/partials/main/main", controller: "mvMainCtrl"})
    .when("/admin/users", {
      templateUrl: "/partials/admin/user-list",
      controller: "mvUserListCtrl",
      resolve: {
        // injectable function
        auth: function(mvIdentity, $q) {
          if (
            mvIdentity.isAuthorized("admin")
          ) {
            return true;
          } else {
            return $q.reject("not authorized");
          }
        }
      }
    });
});

angular.module("app").run(function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(
    evt,
    current,
    previou,
    rejection
  ) {
    if (rejection === "not authorized") {
      $location.path("/");
    }
  });
});
