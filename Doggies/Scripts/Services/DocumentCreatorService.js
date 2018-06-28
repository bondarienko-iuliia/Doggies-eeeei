webApp.factory("DocumentCreatorService", [
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
			GetEventsForDecentPeriodByOrganizationId: function (OrganizationId, startDate, endDate) {
				return requestPromise(
					{
						method: "POST",
						url: "/api/documentCreator/GetEventsForDecentPeriodByOrganizationId",
						params: {
							OrganizationId: OrganizationId,
							startDate: startDate,
							endDate: endDate
						}

					});
			},
			DogsInExhebitionWhithDiplomaAndAchievment: function (eventId) {
				return requestPromise(
					{
						method: "POST",
						url: "/api/documentCreator/DogsInExhebitionWhithDiplomaAndAchievment",
						params: { eventId: eventId }

					});
			},

		};

		return service;
	}]);