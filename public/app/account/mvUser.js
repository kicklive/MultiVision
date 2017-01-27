//angular will post to server here (routes.js). Added PUT so that angular can update exiting data
angular.module("app").factory("mvUser", function($resource) {
  var UserResource = $resource("/api/users/:id", {_id: "@id"},{
update:{method:"PUT", isArray:false}
  });
  UserResource.prototype.isAdmin = function() {
    return this.roles && this.roles.indexOf("Admin") > -1;
  };
  return UserResource;
});
