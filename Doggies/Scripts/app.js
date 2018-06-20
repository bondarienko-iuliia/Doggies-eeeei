
var webApp = angular.module("webApp", ["ngRoute", "ngMessages"]);
webApp.config(["$routeProvider", "$locationProvider",
    function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'template/mainpage',
                controller: 'RedirectCtrl'//,
                //resolve: {
                //    auth: ["Security", function (security) {
                //        return security.checkUserIsAuthorized();
                //    }],
                //    access: ["Security", function (security) {
                //        return security.checkUserInRole(['developer', 'admin']);
                //    }]
                //}
            }).
             when('/login', {
                 templateUrl: 'template/account/login',
                 controller: 'SecurityCtrl'
             }).
             when('/hall', {
                 templateUrl: 'template/app/hall',
                 controller: 'HallCtrl'
             }).
            when('/register', {
                templateUrl: 'template/account/register',
                controller: 'SecurityCtrl'
            }).
            when('/dog', {
                templateUrl: 'template/app/dog',
                controller: 'DogCtrl'
            }).
            when('/adddog', {
                templateUrl: 'template/app/adddog',
                controller: 'DogCtrl'
			}).
			when('/user', {
				templateUrl: 'template/app/user',
                controller: 'UserCtrl'//,
                //resolve: {
                //    auth: ["Security", function (security) {
                //        return security.checkUserIsAuthorized();
                //    }],
                //    access: ["Security", function (security) {
                //        return security.checkUserInRole(['developer', 'admin']);
                //    }]
                //}
            }).
            when('/userProfile', {
                templateUrl: 'template/User/UserProfile',
                controller: 'UserCtrl'
            }).
			when('/judge', {
				templateUrl: 'template/app/judge',
                controller: 'JudgeCtrl'
			}).
			when('/organization', {
				templateUrl: 'template/app/organization',
				controller: 'OrganizationCtrl'
			}).
			when('/request', {
				templateUrl: 'template/app/request',
				controller: 'RequestCtrl'
			}).
            otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }]);