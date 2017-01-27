angular
  .module("app")
  .factory("mvAuth", function($http, mvIdentity, $q, mvUser) {
    return {
      authenticateUser: function(username, password) {
        var dfd = $q.defer();
        // goes to route.js app.post
        $http
          .post("/login", {username: username, password: password})
          .then(function(response) {
            if (response.data.success) {
              var user = new mvUser();
              angular.extend(user, response.data.user);
              mvIdentity.currentUser = user;
              dfd.resolve(true);
            } else {
              dfd.resolve(false);
            }
          });
        return dfd.promise;
      },
      createUser: function(newUserData) {
        var newUser = new mvUser(newUserData);
        var dfd = $q.defer();

        newUser.$save().then(function() {
          mvIdentity.currentUser = newUser;
          dfd.resolve();
        }, function(response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      updateCurrentUser: function(newUserData) {
        var dfd = $q.defer();
        var clone = angular.copy(mvIdentity.currentUser);
        angular.extend(clone, newUserData);
        clone.$update().then(function() {
          mvIdentity.currentUser = clone;
          dfd.resolve();
        }, function(response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      // goes to route.js app.post
      logoutUser: function() {
        var dfd = $q.defer();
        $http.post("/logout", {logout: true}).then(function() {
          mvIdentity.currentUser = undefined;
          dfd.resolve();
        });
        return dfd.promise;
      },
      authorizeCurrentUserForRoute: function(role) {
        if (
          //  if(mvIdentity.currentUser && mvIdentity.currentUser.roles.indexOf('Admin')>-1
          mvIdentity.isAuthorized("Admin")
        ) {
          return true;
        } else {
          return $q.reject("not authorized");
        }
      },
      authorizeAuthenticatedUserForRoute: function() {
        if (
          //  if(mvIdentity.currentUser && mvIdentity.currentUser.roles.indexOf('Admin')>-1
          mvIdentity.isAuthenticated()
        ) {
          return true;
        } else {
          return $q.reject("not authorized");
        }
      }
    };
  });
// 
