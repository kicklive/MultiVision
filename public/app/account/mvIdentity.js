angular.module("app").factory("mvIdentity", function($window,mvUser) {
    // bring in $window dependency (angular $window service) go get the window object. Gives acces to global variables
    var currentUser;
    if(!!$window.bootstrappedUserObject){
        currentUser=new mvUser();
        angular.extend(currentUser,$window.bootstrappedUserObject);
        //currentUser=$window.bootstrappedUserObject;
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function() {
            return !!this.currentUser;
        }, 
        isAuthorized:function(role){
            return !!this.currentUser &&this.currentUser.roles.indexOf(role)>-1;
        }
    }
});