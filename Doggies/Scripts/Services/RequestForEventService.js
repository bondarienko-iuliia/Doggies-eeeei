webApp.factory("RequestService", [
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
		
			SendRequest:function (
				/*UserId,*/ DogId, OrganizationId,EventId) {

				return requestPromise(
					{
						method: "POST",
						url: "/api/request/SendRequest",
						params: {

							//UserId: UserId,//придет id текущего пользователя в RequestController
							DogId: DogId,
							OrganizationId: OrganizationId,
							EventId:EventId
						}

					});
			},
		GetEventsForDecentAmountOfTime: function(dateStart,dateEnd)
		{
			return requestPromise(
				{
					method: "POST",
					url: "/api/request/GetEventsForDecentAmountOfTime",
					params: {
						dateStart: dateStart,
						dateEnd: dateEnd,
					
					}

				});

		},

			GetDogsAndApprovalStateByUserId: function (/*userId,*/eventId ) {
				return requestPromise(
					{
						method: "POST",
						url: "/api/request/GetDogsAndApprovalStateByUserId",
						params: {
						eventId:eventId

						}

					});

			},
			SetRequestApprovalState: function (dId, chName, chValue) {
				return requestPromise(
					{
						method: "POST",
						url: "/api/request/SetRequestApprovalState",
						params: {
							eventId: eventId,
							dogId: dogId,
							state: state
						}

					});
			},
		};

		
		return service;
	}]);