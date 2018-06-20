webApp.factory("PageLoader", ["$http", "Tools", function ($http, tools) {
    return new tools.Loader();
}]);
