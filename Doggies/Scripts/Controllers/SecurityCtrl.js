webApp.controller("SecurityCtrl", ["$scope", "$http", "$location", "Security", function ($scope, $http, $location, security) {

    var searchObject = $location.search();

    $scope.username = "";
    $scope.password = "";
    $scope.email = "";

    $scope.$watch("user", function (newUser) {
        if (newUser) {
            //console.log(searchObject.returnUrl);
            $location.url("/user");
        }
    });
    $scope.tryLogin = function (username, password) {
        security.Login(username, password);
    };
    $scope.register = function (username, password, email) {
        security.Register(username, password, email);
    };

    $scope.logout = function () {
        security.Logout();
    }
}]);