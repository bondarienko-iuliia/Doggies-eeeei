webApp.controller("TeachersCtrl", [
    "$rootScope", 
    "$scope",
    "RequestPromise",
    "Teacher",
    function (
        $rootScope,
        $scope,
        requestPromise,
        teacher
) {

        $scope.teachers;
        teacher.getTeachers().then(function (data) {
             $scope.teachers = data;
        })
}]);