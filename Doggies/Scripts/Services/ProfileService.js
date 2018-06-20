webApp.factory("ProfileService", [
    "$rootScope",
    "HttpRequest",
    "RequestPromise",
    "Tools",
    function (
        $rootScope,
        httpRequest,
        requestPromise,
        tools
    ) {

        var service = {
            createDocument :function (forDocument) {
                return requestPromise(
                    {
                        method: "POST",
                        url: "/api/user/CreateDocument",
                        data: forDocument,
                        params: {
                            dogId: forDocument.dogName,
                            eventId: forDocument.eventName

                        }
                    }
                );
            },
            fillDogsAndEventsLists : function () {
				if (!$rootScope.IsAuthorized) {
					console.log("не авторизован")
					return null;
				}


                return requestPromise(
                    {
                        method: "POST",
                        url: "/api/user/FillDogsAndEventsLists",
                    }
                );
            },
            newUserInfo : function (UserName, UserSurname, UserPatronymic, Region, City, Address) {
                return requestPromise(
                    {
                        method: "POST",
                        url: "/api/user/newUserInfo",
                        data: {
                           Name: UserName,
                           Surname: UserSurname,
                           Patronymic: UserPatronymic,
                            Region: Region,
                            City: City,
                            Address: Address
                        }
                    }
                );
            }

        };

        return service;
    }]);