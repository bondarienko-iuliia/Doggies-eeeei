webApp.controller("DogCtrl", ["$rootScope", "$scope", "RequestPromise", "Security", function ($rootScope, $scope, requestPromise, security) {
    $scope.DogName = "";
    $scope.VpkosOrLicenceNumber = "";
    $scope.IsMale = "";
    $scope.Color = "";
    $scope.Breed = "";
    $scope.DateOfBirth = "";
    $scope.MotherId = "";
    $scope.FatherId = "";

    $scope.getDogs = function () {
        return requestPromise(
            {
                method: "POST",
                url: "/api/dog/getDogs"
            }
        );
    }
    $scope.Dogs;
    $scope.getDogs().then(function (data) {
        $scope.Dogs = data;
        console.log(data);
    })
    
    $scope.addDog = function (DogName, VpkosOrLicenceNumber, IsMale, Color, Breed, DateOfBirth, MotherId, FatherId) {
        DogService.addDog(DogName, VpkosOrLicenceNumber, IsMale, Color, Breed, DateOfBirth, MotherId, FatherId);
    }
    
}]);