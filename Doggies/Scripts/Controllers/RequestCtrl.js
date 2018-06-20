webApp.controller("RequestCtrl", ["$rootScope", "$scope", "RequestPromise", "Security", "RequestService", function ($rootScope, $scope, requestPromise, security,RequestService) {
	$scope.selectedEvent;
	///передать текущего пользователя!!!!!!!!!!!
	//RequestService.SendRequest(9595959, 6,2).then(console.log("я вызвалась"));//
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!подставить нужные даты
	$scope.IsEvent = function () {
		if ($scope.selectedEvent == "") {
			console.log("нет мероприятий");
			return false;
		}
		else return true;
	}
	$scope.IsDog = function () {
		if ($scope.selectedDog == "") {
			console.log("нет cj,fr");
			return false;
		}
		else return true;
	}
	$scope.selectedEvent;//id мероприятия и id организации
	var selectedEvent = {eventId:"",organizationId:""};
	$scope.selectedDog;//id собаки

	
	$scope.events = [];
	$scope.dogs = [];
	RequestService.GetEventsForDecentAmountOfTime('11.12.2015', '11.02.2019').then(
		function (data) {
			$scope.events = data

			console.log($scope.events)
			}
		//приходит полноценное мероприятие (не надо так)
		)
	//выбрать собак которые не участвуют в мероприятии и не подали заювку на это мероприятие
	$scope.GetDogs = function () {
		var tmp = $scope.selectedEvent.split('|');
		selectedEvent.eventId = parseInt(tmp[0]);
		selectedEvent.organizationId = parseInt(tmp[1]);
		console.log("организация");
		console.log(selectedEvent.organizationId);
		console.log("меропритие");
		console.log(selectedEvent.eventId);
		RequestService.GetDogsAndApprovalStateByUserId(selectedEvent.eventId).then(function (data) { $scope.dogs = data });
	
	}

	$scope.SendRequest = function ()
	{
		RequestService.SendRequest($scope.selectedDog, selectedEvent.organizationId, selectedEvent.eventId, );
		alert("заявка отправлена");
		$scope.dogs.forEach(function (dog) { if (dog.DogId == $scope.selectedDog) dog.RequestApprovalState = 2 });
	}
	$scope.canBeSend = false;
	$scope.SelectDog = function (dogId ,state) {
		$scope.selectedDog = dogId;
		if (state != 2 && state != 1 && state != 3)
			$scope.canBeSend = true;
		else
			$scope.canBeSend = false;
		console.log(dogId);
	}
	$scope.RequestCanBeSend = function () {
		
		return	$scope.canBeSend ;
		
	}

	//нужно как-то отображать запись собаки на мероприятие или рассмотрение заявки....
}]);