webApp.controller("FilterCtrl", ["$rootScope", "$scope", function ($rootScope, $scope) {

    $scope.products = [
        {
            Name: 'Meizu m5',
            Price: 12000
        },
        {
            Name: 'Meizu m5s',
            Price: 10000
        },
        {
            Name: 'Meizu A10',
            Price: 12000
        },
        {
            Name: 'Xiomi Redmi note 4x',
            Price: 12000
        },
        {
            Name: 'Xiomi Reedmi 4 pro',
            Price: 13000
        },
        {
            Name: 'iPhone 1',
            Price: 14000
        },
        {
            Name: 'iPhone 2',
            Price: 15000
        }
    ];
    
    console.log($scope.products);

}])

webApp.filter('commonFilter', function () {
    return function (array, str) {
        if (!str) {
            return array;
        }
        var result = [];

        str = str.toLowerCase();

        angular.forEach(array, function (item) {
            if (item.Name.toLowerCase().indexOf(str) !== -1) {
                result.push(item);
            }
        })
        return result;

    }
});