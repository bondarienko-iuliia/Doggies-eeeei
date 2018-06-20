webApp.controller("OrganizationCtrl", ["$rootScope", "$scope", "RequestPromise", "Security", "OrganizationService", function ($rootScope, $scope, requestPromise, security, OrganizationService) {
	$scope.dogs = [];
	$scope.all = [];
	$scope.accepted = [];//заявки не принятые
	$scope.rejected = [];// заявки отклоненные
	$scope.inProcess = [];//заявки не рассмотренные
	$scope.filter="inProcess";//фильтер по состоянию заявки
	OrganizationService.GetInfoForRequestApprovalByOrganizationId().then(function (data) {
		//изначально в data - владельцы,
			//в владельцах - список собак,
			//в собаках - список состояний рассмотрения заявок на мероприятий от даннной организации
		console.log(data[0]);
		console.log(data[1]);
		data[0].forEach(function (user) {
		//В этом цикле я меняю логику 
			// теперь в собаке хранится владелец
			user.Dogs.forEach(function (dog, i) {
				$scope.dogs[i] = dog;
		
				$scope.dogs[i].User = user;
				
				data[1].forEach(function (event, j) { //перебираем список мероприятий , устраиваемые этой оганизацией
				//if (dog.RequestStates.length>0)
				
					dog.RequestStates.forEach(function (rs) {//перебираем список сотоний заявки для каждой собаки
						if (rs.EventId == event.EventId)
						{
				
						
							
							var requestState = rs.RequestApprovalState;// !!да есть дубли , но так удобнее
							$scope.all.push({ event, dog, requestState })

							if (requestState == 1)
								$scope.accepted.push({ event, dog, requestState });
							if (requestState == 2)
								$scope.inProcess.push({ event, dog, requestState });
							if (requestState == 3)
								$scope.rejected.push({ event, dog, requestState });
						}	
					})
				})
				//теперь все удобно для ангулара:
		//	$scope.eventsAndDogs=[{event,dog{user,approvalstates},approvalState}]
		
			})
		})
	
		console.log($scope.all);
	})
	$scope.SetFilter = function (filter) {
		$scope.filter = filter;
		console.log($scope.filter);
	}

	$scope.SetApprovalState = function (eventId, dogId, state) {
		$scope.all.forEach(function (event)
		{
			if (event.dog.DogId == dogId && event.event.EventId == eventId)
			{
				event.requestState = state;
				console.log("зашла");
			}
		})
		alert("состояние заявки изменено");
		OrganizationService.SetRequestApprovalState(eventId, dogId, state);
		
	}
}]);