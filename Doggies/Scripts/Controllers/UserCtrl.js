webApp.controller("UserCtrl", ["$rootScope", "$scope", "RequestPromise", "ProfileService", function ($rootScope, $scope, requestPromise, profile) {
	//все, что должно попасть в документ
    $scope.forDocument = {};

    $scope.UserId = "";
    $scope.UserName = "";
    $scope.UserSurname = "";
    $scope.UserPatronymic = "";
    $scope.Region = "";
    $scope.City = "";
    $scope.Adress = "";
    
	//вспомогательная штука для отображения select-а с собаками
	$scope.IsEvent = function () {
		getDogsForEvent();
		if ($scope.forDocument.eventName !== "") {
			return true;
		}
		else return false;
	}

	$scope.events = [];
    
    $scope.profile;//здесь пользователь
    if ($rootScope.user != undefined) {// если пользователь АВТОРИЗОВАН!
        profile.fillDogsAndEventsLists().then(
            function (data) {//получили пользователя(его вернул fillDogsAndEventsLists)
				$scope.profile = data;
				console.log($scope.profile);
                data.Dogs.forEach(function (dog) {//перебор всех собак пользователя
                    if (dog.Events !== null) {//если список мероприятий собаки не пуст
                        dog.Events.forEach(function (eve) {//перебор мероприятий

                            if ($scope.events.length > 0) {//если в наш массив мероприятий ($scope.event) уже что-то занесено
                                var isneed = true;
                                $scope.events.forEach(function (scopeEvent) {//проверка
                                    if (scopeEvent.EventId === eve.EventId) {//на совпадение мероприятей в нашем $scope.event и в списке мероприятий у собаки
                                        isneed = false;
                                    }

                                })
                                if (isneed) {
                                    $scope.events.push(eve);
                                }
                            }
                            else {
                                $scope.events.push(eve);
                            }
                            //console.log(dog);
                        })
                    }
                })
                //console.log($scope.events);
            }
        );
    }
	$scope.dogs = [];//все собаки для данного мероприятия
	function getDogsForEvent() {
		$scope.events.forEach(function (scopeEvent) {//перебор нашего массива мероприятий
			$scope.profile.Dogs.forEach(function (dog) {//переборсписка собак ползователя
				if (dog.Events !== null) {//если список мероприятий собаки не пуст
					dog.Events.forEach(function (eve) {//перебираем мероприятия собаки
						//если EventId нашего массива мероприятий совпадает с EventId в списке мероприятий данной собаки
						if (eve.EventId === scopeEvent.EventId) {
							var isneed = true;
							$scope.dogs.forEach(function (d) {//нужно поместить собаку в наш массив собак
								if (d.DogId == dog.DogId) {
									isneed = false;
								}

							})
							if (isneed) {
								$scope.dogs.push(dog);
							}
						}
					})
				}
			})
		});
		//console.log($scope.events[0].EventName);
    }

    $scope.createDocument = function () {
        profile.createDocument($scope.forDocument);
    }


    $scope.newUserInfo = function (UserName, UserSurname, UserPatronymic, Region, City, Address) {
        profile.newUserInfo(UserName, UserSurname, UserPatronymic, Region, City, Address);
    }
	$scope.newInfo = {};


	//территория отправки заявки
	//$scope.SendRequest = function (
	//	UserId, DogId, OrganizationId) {
		
	//	return requestPromise(
	//		{
	//			method: "POST",
	//			url: "/api/user/SendRequest",
	//			params: {

	//				UserId: UserId,
	//				DogId: DogId,
	//				OrganizationId: OrganizationId
	//			}

	//		});
	//}
	
}]);







