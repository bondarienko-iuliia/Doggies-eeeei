webApp.factory("HttpRequest", ["$http", "Tools", "PageLoader", function ($http, tools, pageLoader) {
    return function (data, callback, loader) {
        if (typeof loader != "object" || !(loader instanceof tools.Loader)) {
            loader = pageLoader;
        }

        loader.Regist(function (requestCallback) {
            $http(data).then(
                function (res) {
                    callback(res.data);
                    requestCallback();
                },
                function (res) {
                    requestCallback();
                });
        });
    };
}]);


