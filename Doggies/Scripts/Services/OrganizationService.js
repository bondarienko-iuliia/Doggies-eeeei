webApp.factory("OrganizationService", [
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
			GetInfoForRequestApprovalByOrganizationId: function () {
				return requestPromise(
					{
						method: "POST",
						url: "/api/organization/GetInfoForRequestApprovalByOrganizationId",
					

					});

			},
			SetRequestApprovalState: function (eventId, dogId, state) {
				return requestPromise(
					{
						method: "POST",
						url: "/api/organization/SetRequestApprovalState",
						params: {
							eventId: eventId,
							dogId: dogId,
							state: state
						}

					});
			}
		
		};

		return service;
	}]);