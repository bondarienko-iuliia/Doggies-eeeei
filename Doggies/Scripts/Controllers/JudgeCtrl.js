webApp.controller("JudgeCtrl", ["$rootScope", "$scope", "RequestPromise", "JudgeService", "Security", function ($rootScope,
    $scope, requestPromise, JudgeService, security) {

    //!!!!---уменьшить количество обрабатываемой информации
    $scope.selectedDogId;
    $scope.helper = "";
    $scope.events = [];
	$scope.eventType;
	
	x = {
		aInternal: -2,
		aListener: function (val) { },
		set a(val) {
			this.aInternal = val;
			this.aListener(val);
		},
		get a() {
			return this.aInternal;
		},
		registerListener: function (listener) {
			this.aListener = listener;
		}
	}
	x.registerListener(function (val) {
		//alert("Someone changed the value of x.a to " + val);
	});
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
    //костыльно (
    // вызывается при выборе мероприятия
    $scope.getDogsByEventAndSetEventType = function () {
        
        $scope.setEventType();
        JudgeService.getDogsByEventId($scope.helper).then(function (data) {
            $scope.dogs = data;

            $scope.dogs.forEach(function (dog) {
                dog.Marks = [];
                //для каждой собаки
                for (var i = 0; i < 13; i++) {
                    //в массив оценок засовываем объект со свойством mark и значением 0
                    dog.Marks.push({ mark: 0 });
                }
            })
            //console.log($scope.dogs);
        })
    }



    ///------------------------------Территория Печенья--------------------------------

    $scope.CreateCookie = function () {

        $scope.cookieString = '';

        $scope.dogs.forEach(function (dog) {
            //$IdСобаки#45#44#4....$IdСобаки#12#14#55...
            $scope.cookieString = $scope.cookieString + "$" + dog.DogId;//предыдущая строка соединяеться с $ + имемя собаки
            dog["Marks"].forEach(function (mark, i, arr) {

                $scope.cookieString = $scope.cookieString + "#" + mark.mark;
                //alert("\\\\"+ mark.mark );
            })

        })
        $scope.cookieString = "ChallengeMarks=" + $scope.cookieString;
        document.cookie = $scope.cookieString;
        console.log(getCookie("ChallengeMarks"));
        //alert(document.cookie);
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




        dogsAndMarks.shift();//???????????может ли это быть проблемой?

        dogsAndMarks.forEach(
            function (d, i) {
                //в массиве собак создаем объект dogObject , в нем свойства: dogId и массив оценок marks
                $scope.dogMass.push({ dogId: "", marks: [] });

                $scope.dogMass[i].dogId = d.substring(0, 1);//IdСобаки#45#44#4 - берем IdСобаки
                $scope.dogMass[i].marks = (d.substring(1)).split("#");
                $scope.dogMass[i].marks.shift();
            }
        )
        console.log($scope.dogMass);
    }

    ///-------------------------------Конец Печенья--------------------------------

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
        $scope.setEventType();
    }

    /// ------------------------------для выставки-------------------------------
    //собака из выпадающего списка


    $scope.isDogSelected = function () {

        if ($scope.selectedDogId != undefined) {
            console.log($scope.selectedDogId);
            return true;
        }
        else {
            //console.log("(");
            //console.log("собака не выбрана")
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
                if (dog.UserId == owner.UserId) {	//сюда зайдет один раз при любых обстоятельствах(тк у собаки должен быть один хозяин),
                    //поэтому здесь и будет forEach на определение детей собаки

                    //временный массив детей
                    tmpChildren = [];
					$scope.dogExhibitionParticipants.forEach(function (mayBeChild) {

						if (mayBeChild.MotherId == dog.DogId || mayBeChild.FatherId == dog.DogId) {
							tmpChildren.push(mayBeChild);
                        }
                    });
                    dog.children = tmpChildren;
                    //для каждой собаки-участника найдем владельца
                    dog.ownerName = owner.UserSurname + " " + owner.UserName + " " + owner.UserPatronymic;
                    dog.ownerAddress = owner.Region + " " + owner.City + " " + owner.Address;


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
			if (dog.DogId == $scope.selectedDogId)
			{
                //var selectedDog = 
                    $scope.selectedDog = $scope.dogExhibitionParticipants[i];
                //console.log(dog);
                //console.log($scope.dogExhibitionParticipants[i]);
				//$scope.exhebitionDataForSelectedDog.DogName = selectedDog.DogName;
				//$scope.exhebitionDataForSelectedDog.VpkosOrLicenseNumber = selectedDog.VpkosOrLicenseNumber;
				//$scope.exhebitionDataForSelectedDog.Color = selectedDog.Color;

				//$scope.exhebitionDataForSelectedDog.Breed = selectedDog.Breed;
				//$scope.exhebitionDataForSelectedDog.DateOfBirth = selectedDog.DateOfBirth;
				//$scope.exhebitionDataForSelectedDog.Diploma = selectedDog.Diploma;
				//$scope.exhebitionDataForSelectedDog.DogAchievment = selectedDog.DogAchievment;
				//$scope.exhebitionDataForSelectedDog.Mother = selectedDog.Mother;
				//$scope.exhebitionDataForSelectedDog.Father = selectedDog.Father;
				//$scope.exhebitionDataForSelectedDog.children = selectedDog.children;
				//$scope.exhebitionDataForSelectedDog.ownerAddress = selectedDog.ownerAddress;
				//$scope.exhebitionDataForSelectedDog.ownerName = selectedDog.ownerName;
			}
			
		});
        console.log($scope.selectedDog);
        
	}


	
}]);