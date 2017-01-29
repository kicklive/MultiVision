angular.module("app").controller("mvCourseListCtrl",function($scope, mvCourse){
    $scope.course=mvCourse.query();
})