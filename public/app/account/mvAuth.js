angular.module("app").factory("mvAuth", function($http, mvIdentity, $q,mvUser) {
  return {
    authenticateUser: function(username, password) {
      var dfd = $q.defer();
      // goes to route.js app.post
      $http.post("/login", {
        username: username,
        password: password
      }).then(function(response) {
        if (response.data.success) {
          var user=new mvUser();
          angular.extend(user,response.data.user);
          mvIdentity.currentUser = user;
          dfd.resolve(true);
        } else {
          dfd.resolve(false);
        }
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
    authorizeCurrentUserForRoute:function(role){
       if (
            mvIdentity.isAuthorized("Admin")
          //  if(mvIdentity.currentUser && mvIdentity.currentUser.roles.indexOf('Admin')>-1
          ) {
            return true;
          } else {
            return $q.reject("not authorized");
          }
    }
  };
});


