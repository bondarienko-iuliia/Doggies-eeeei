webApp.controller("DocumentCreatorCtrl", ["$rootScope", "$scope", "RequestPromise", "Security", "DocumentCreatorService", function ($rootScope, $scope, requestPromise, security, docService) {
	$scope.events;
	$scope.selectedEvent="";
	$scope.eventType;
	$scope.dogExhibitionParticipants;
	$scope.SelectedForDocument;//сюда приходит инф-я об отмеченных участниках
	$scope.FilteredParticipants;//участники, отмеченные галочками
	var isloaded = false;


	//!!!!!!!!!!!!!добавить вычисление  дат и CurrentUser.Id!!!!!

	docService.GetEventsForDecentPeriodByOrganizationId(1, '10.10.2010', '10.10.2019').then(function (data) { $scope.events = data; });
	//docService.GetInfoForExhibitionDocument().then(function (data) { console.log(data) });
	//дергаем информацию для конкретного мероприятия
	$scope.GetInfoForDocument = function ()
	{
		var tmp = $scope.selectedEvent.split('|');
		var eventId = tmp[0];
		var eventType = tmp[1];
		//если выставка
		if (eventType == 2)
		{
			docService.DogsInExhebitionWhithDiplomaAndAchievment(eventId).then(function (data) {
//этот кусок украден из JudgeCtrl
				console.log(data);
				$scope.dogExhibitionParticipants = data[0]; // участники мероприятия с их родителями и детьми

				$scope.Owners = data[1];//владельцы участников, родителей и детей

				//Foreach владельцы { Foreach собаки-участники{Foreach дети} }
				$scope.Owners.forEach(function (owner) {

					$scope.dogExhibitionParticipants.forEach(function (dog) {

						//переделать, слишком костыльно....
						if (dog.UserId == owner.Id) {	//сюда зайдет один раз при любых обстоятельствах(тк у собаки должен быть один хозяин),
							//поэтому здесь и будет forEach на определение детей собаки
							//для каждой собаки-участника найдем владельца
							//console.log(owner.Id);
							dog.ownerName = owner.Surname + " " + owner.Name + " " + owner.Patronymic;
							dog.ownerAddress = owner.Region + " " + owner.City + " " + owner.Address;

							if (dog.Mother != null) {
								dog.Mother.ownerName = owner.Surname + " " + owner.Name + " " + owner.Patronymic;
							}
							if (dog.Father != null) {
								dog.Father.ownerName = owner.Surname + " " + owner.Name + " " + owner.Patronymic;
							}
							//временный массив детей
							tmpChildren = [];
							$scope.dogExhibitionParticipants.forEach(function (maybeChild) {
								if (maybeChild.MotherId == dog.DogId || maybeChild.FatherId == dog.DogId) {
									tmpChildren.push(maybeChild);
								}
							});
							if (tmpChildren.length == 0) {
								var diploma = new Array({ DiplomaBall: '-', DiplomaDegree: "-" });
								var ach = new Array({ ExterierMark: '-', ExterierBall: "-" });
								tmpChildren.push({
									DogName: '-', VpkosOrLicenseNumber: '-', ownerName: '-', Diploma: diploma, DogAchievement: ach
								})
							}
							dog.children = tmpChildren;
					
						}

					});
					isloaded = true;
					console.log($scope.dogExhibitionParticipants);
				})
			})
		}
		if (eventType == 1)
		{
			alert("нужно переделать то, что в пользователе...");
		}
	}

	$scope.CreateDocument = function ()
	{
		///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!костыль!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		$scope.SelectedForDocument.push({ UserId: 1, DogId: 1, Checked: true });//Шарик
		$scope.SelectedForDocument.push({ UserId: 1, DogId: 3, Checked: true });//Изабель
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		if (isloaded===true)
		{
			//для каждого, кто был отмечен галочкой
			$scope.dogExhibitionParticipants.forEach(
				function (dog)
				{
					$scope.SelectedForDocument.forEach(function (selected)
					{
						if (selected.Checked == true && selected.UserId == dog.UserId && selected.DogId == dog.DogId)
					{//отбор по id владельца и собаки
						$scope.FilteredParticipants.push(dog);
					}});
					
				}
			);
			
		}
		isloaded = false;
	}
$scope.createDocument = function () {
	docService.createDocument($scope.$scope.FilteredParticipants);
			}
		
}]);