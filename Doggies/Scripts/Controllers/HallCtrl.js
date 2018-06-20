webApp.controller("HallCtrl", ["$rootScope", "$scope", "RequestPromise", "Security", function ($rootScope, $scope, requestPromise, security) {
    $scope.Hall = {
        id: 1,
        Sectors: [
            {
                id: 1,
                Rows: [
                    {
                        id: 1,
                        label: 1,
                        Seats: [
                            { id: 1, label: 1, Price: 1000 },
                            { id: 2, label: 2, Price: 1000 },
                            { id: 3, label: 3, Price: 1000 }
                        ]
                    },
                    {
                        id: 2,
                        label: 2,
                        Seats: [
                            { id: 4, label: 1, Price: 500 },
                            { id: 5, label: 2, Price: 500 },
                            { id: 6, label: 3, Price: 500 }
                        ]
                    }
                ]
            },
            {
                id: 2,
                Rows: [
                    {
                        id: 3,
                        label: 1,
                        Seats: [
                            { id: 7, label: 1, Price: 1000 },
                            { id: 8, label: 2, Price: 1000 },
                            { id: 9, label: 3, Price: 1000 }
                        ]
                    },
                    {
                        id: 4,
                        label: 2,
                        Seats: [
                            { id: 10, label: 1, Price: 500 },
                            { id: 11, label: 2, Price: 500 },
                            { id: 12, label: 3, Price: 500 }
                        ]
                    }
                ]
            }
        ]
    }
    console.table($scope.Hall.Sectors[0].Rows[0].Seats);
    $scope.CookieName;
    $scope.addClaim = function() {
        requestPromise(
            {
                method: "POST",
                url: "/api/teacher/addClaim",
                params: {
                    name: "firstCookie",
                    value: "teting"
                }
            }
        );
    }
    $scope.receiveClaim = function () {
        requestPromise(
            {
                method: "POST",
                url: "/api/teacher/receiveClaim",
                params: {
                    name: "firstCookie"
                }
            }
        ).then
        (function (data) {
            console.log(data);
            $scope.CookieName = data;
        })
    }
    $scope.getCurrentUser = function () {
        security.getCurrentUser().then(function (data) {
            console.log(data);
        })
    }
    $scope.testLocal = function () {
        console.log(123);
        requestPromise(
            {
                method: "GET",
                url: "/api/account/testLocal"
            }
        ).then
        (function (data) {
            console.log(data);
        })
    }
}]);