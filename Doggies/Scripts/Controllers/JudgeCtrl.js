webApp.controller("JudgeCtrl", ["$rootScope", "$scope", "RequestPromise", "JudgeService", "Security", function ($rootScope,
	$scope, requestPromise, JudgeService, security) {

	//!!!!---уменьшить количество обрабатываемой информации
	$scope.selectedDogId="";
	$scope.helper = "";
	$scope.events = [];
	$scope.eventType;
	var set = false;
	var sent = false;
	
	var odjectForExhebitionToParse;

	var isloaded = false;

	//устанавливаем тип, выбранного на данный момент мероприятия 
	$scope.setEventType = function () {
		//обнуляем "смотрителя" мероприятий
		$scope.eventType = "";




		if ($scope.events.length > 0) {
			// для каждого события
			$scope.events.forEach(function (ev) {
				//если id мероприятия совпадает с id выбранного мероприятия (оно в $scope.helper)
				if (ev.EventId == $scope.helper) {
					$scope.eventType = ev.EventType;
					console.log(ev);
					if ($scope.eventType == 2) {
						JudgeService.fillListsForExhebition($scope.helper).then(
							function (data) {
								odjectForExhebitionToParse = data;//вернули смесь из собак, их детей и владельцев
								console.log(odjectForExhebitionToParse);
								console.log("вся необходимая информация о выставке взята");
								$scope.parseObjectForExhebition(odjectForExhebitionToParse);//рассортировали все в более-менее норм состояние 
							});

					}

				}
			})
		}

	}

	JudgeService.getAllEvents().then(
		function (data) {
			//console.log(data);
			$scope.events = data;
		}

	);

	//после получения мероприятий 
	//найдем всех собак,  в нем участвующих 

	$scope.dogs = [];
	// вызывается при выборе мероприятия
	$scope.getDogsByEventAndSetEventType = function () {
		$scope.setEventType();
		JudgeService.getDogsByEventId($scope.helper).then(function (data) {
			$scope.dogs = data;
			$scope.dogs.forEach(function (dog) { //для каждой собаки
				dog.Marks = [];
				for (var i = 0; i < 13; i++) {
					//в массив оценок 13 раз помещаем объект со свойством mark и значением 0
					dog.Marks.push({ mark: 0 });
				}
			})
			console.log($scope.dogs);
		})
	}


	//$IdСобаки#45#44#4....$IdСобаки#12#14#55...//предыдущая строка соединяеться с $ + имемя собаки
	///------------------------------Территория Печенья--------------------------------

	$scope.CreateCookie = function () {
		$scope.cookieString = '';
		$scope.dogs.forEach(function (dog) {
			$scope.cookieString = $scope.cookieString + "$" + dog.DogId;
			dog["Marks"].forEach(function (mark, i, arr) {
				$scope.cookieString = $scope.cookieString + "#" + mark.mark;
			})
		})
		$scope.cookieString = "ChallengeMarks=" + $scope.cookieString;
		document.cookie = $scope.cookieString;
		console.log(getCookie("ChallengeMarks"));
	devideCookie(getCookie("ChallengeMarks"));
	$scope.SaveAllChallengeValues();
	}
	

	// возвращает cookie с именем name, если есть, если нет, то undefined
	function getCookie(name) {
		var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	$scope.dogMass = [];
	//отлично! печенье есть, теперь разобьем его на части
	function devideCookie(cookie) {
		var dogsAndMarks = [];
		dogsAndMarks = cookie.split("$");
		dogsAndMarks.shift();
		dogsAndMarks.forEach(
			function (d, i) {
				//в массиве собак создаем объект dogObject , в нем свойства: dogId и массив оценок marks
				$scope.dogMass.push({ dogId: "", marks: [] });
				$scope.dogMass[i].dogId = d.substring(0, 1);//IdСобаки#0#0#4... - берем IdСобаки
				$scope.dogMass[i].marks = (d.substring(1)).split("#");
				$scope.dogMass[i].marks.shift();
			}
		)	
	}
console.log($scope.dogMass);
	///-------------------------------Конец Печенья--------------------------------
	$scope.safeSend = function () {
		JudgeService.CheckConnection().then(function (data) {
			if (data ==1) {
				sent = true;
			//	JudgeService.setChallengeValue($scope.ch.dId, $scope.ch.chName, $scope.ch.chVal);
				document.cookie = "ChallengeMarks=''";
			}
			else {
				sent = false;
			}
			$scope.check()
		});
	}
	$scope.check = function () {
		var interval;
		if (!sent && !set) {
			interval = setInterval($scope.safeSend, 2000);
			set = true;		
		}
		if (sent && set) {
			clearInterval(interval);
			set = false;
		}
	}
	//теперь занесем информацию  из печенюшного массива собак в базу 
	$scope.ch = { dId: "", chName: "", chVal: "" }//то, что нужно занести в базу
	///занести оценки по испытаниям в базу
	$scope.SaveAllChallengeValues = function () {

		//для каждой собаки
		$scope.dogMass.forEach(function (d, i) {

			//для каждого элемента массива оценок (для одной собаки)
			$scope.dogMass[i].marks.forEach(function (mark, j) {
				//меням значение свойств объекта $scope.ch
				$scope.ch.dId = $scope.dogMass[i].dogId;
				$scope.ch.chName = "" + j;
				$scope.ch.chVal = mark;
				
				//console.log($scope.ch);
				//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!и заносим их в базу
				//JudgeService.setChallengeValue($scope.ch.dId, $scope.ch.chName, $scope.ch.chVal );
				//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			});
			
		});
		
		

		$scope.check();
		
	//	$scope.setEventType();
	}
	
	/// ------------------------------для выставки-------------------------------
	//собака из выпадающего списка


	$scope.isDogSelected = function () {

		if ($scope.selectedDogId != "") {

			return true;
		}
		else {
			return false;
		}
	}
	$scope.isEventSelected = function () {
		if (isloaded) {
			return true;
		}
		else {
			return false;
		}
	}

	$scope.dogExhibitionParticipants;
	$scope.dogExhebitionParticipantChildren;
	$scope.Owners;
	$scope.parseObjectForExhebition = function (obj) {
		console.log(obj);

		$scope.dogExhibitionParticipants = obj[0]; // участники мероприятия с их родителями и детьми

		$scope.Owners = obj[1];//владельцы участников, родителей и детей

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
					if (tmpChildren.length == 0)
					{
						var diploma = new Array({ DiplomaBall: '-', DiplomaDegree: "-" });
						var ach = new Array({ ExterierMark: '-', ExterierBall: "-" });
						tmpChildren.push({
							DogName: '-', VpkosOrLicenseNumber: '-', ownerName:'-',Diploma:diploma,DogAchievement:ach})
					}
					dog.children = tmpChildren;
					console.log(dog.children[0]);
				}

			});
		});

		console.log($scope.dogExhibitionParticipants);
		isloaded = true;

	}
	//забрать
	$scope.exhebitionDataForSelectedDog = {};
	$scope.selectedDog;
	//вызвать функцию после изменения $scope.dogExhibitionParticipants
	$scope.getInfoForSelectedDog = function () {

		//перебираем собак-участников
		$scope.dogExhibitionParticipants.forEach(function (dog, i) {
			if (dog.DogId == $scope.selectedDogId) {
			
				$scope.selectedDog = $scope.dogExhibitionParticipants[i];
				
				console.log($scope.selectedDog);
			}

		});
		//исправлен косяк с типами(DateTime и Date)
		$scope.selectedDog.DateOfBirth = $scope.selectedDog.DateOfBirth.substring(0, 10);//выбираем только дату
		//устанавливаем пол
		$scope.selectedDog.Gender = $scope.selectedDog.IsMale == true ? 'кобель' : 'сука';
		$scope.selectedDog.Age = calculate_age(parseInt($scope.selectedDog.DateOfBirth.substring(0, 4)), parseInt($scope.selectedDog.DateOfBirth.substring(5, 7)), parseInt( $scope.selectedDog.DateOfBirth.substring(8, 10))) 
		////console.log(calculate_age(2017, 6, 24))
		////console.log(calculate_age(2017, 6, 23))
		////console.log(calculate_age(2017, 5, 24))
		////console.log(calculate_age(2017, 6, 25))
	}
	
	function calculate_age(birth_year,birth_month,birth_day  ) {
		today_date = new Date();
		today_year = today_date.getFullYear();
		
		today_month = today_date.getMonth();

		today_day = today_date.getDate();
		age = today_year - birth_year;

		if (today_month < (birth_month - 1)) {//если родился в раньше на месяц, чем и в текущей дате
			age--;
		}
		//на в месяц текущей даты и день рождения позже сегодняшнего дня
		if (((birth_month - 1) == today_month) && (today_day < birth_day)) {
			age--;
		}
		return age;
	}

// для выставления оценок по выставке
	$scope.ExhibitionMark = {};
	$scope.SetExhibitionMark = function ()
	{
		console.log($scope.ExhibitionMark);
		//JudgeService.SetExhibitionMark($scope.ExhibitionMark.WorkingSkills, $scope.ExhibitionMark.ExterierMark, $scope.ExhibitionMark.ChildrenMark, $scope.ExhibitionMark.ParentsMark, $scope.selectedDog.DogId ).then(console.log("sent"));

	}

}]);