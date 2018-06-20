webApp.factory("RequestPromise", ["$http", "$q", "Tools", "PageLoader", function ($http, $q, tools, pageLoader) {
    return function (data, loader, sendFullData) {

        // если false то создаем совй временный лодер
        if (loader === false) {
            loader = new tools.Loader();
        }


        // если передан лодер, то используем его, иначе общий
        if (typeof loader != "object" || !(loader instanceof tools.Loader)) {
            loader = pageLoader;
        }

        var deferred = $q.defer();

        loader.Regist(function (loaderCallback) {
            // создаем обещание
            var httpPromise = $http(data);

            httpPromise.then(function (result) {

                if (sendFullData) {
                    deferred.resolve(result.data);
                }
                else {
                    deferred.resolve(result.data.Data);
                }

                // освобождаем загрузчик
                loaderCallback();
            }, function () {
                deferred.reject(false);
                // освобождаем загрузчик
                loaderCallback();
            });
        });

        return deferred.promise;
    };
}]);


