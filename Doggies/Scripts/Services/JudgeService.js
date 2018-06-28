webApp.factory("JudgeService", [
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

        getAllEvents : function () {
            return requestPromise(
                {
                    method: "POST",
                    url: "/api/judge/GetAllEvents",

                });
        },
        getDogsByEventId: function (id) {
            return requestPromise(
                {
                    method: "POST",
                    url: "/api/judge/getDogsByEventId",
                    params: { id: id }

                });
        },
        setChallengeValue: function (dId, chName, chValue ) {
            return requestPromise(
                {
                    method: "POST",
                    url: "/api/judge/SetChallengeValue",
                    params: {
                        dId: dId,
                        chName: chName,
                        chValue: chValue
                    }

                });
        },
        fillListsForExhebition: function (eventId) {//вызов при смене типа события
            return requestPromise(
                {
                    method: "POST",
                    url: "/api/judge/FillListsForExhebition",
                    params: { eventId: eventId}

                });
		},
		CheckConnection: function () {//вызов при смене типа события
			return requestPromise(
				{
					method: "POST",
					url: "/api/judge/CheckConnection",
					

				});
		},
		SetExhibitionMark: function (WorkingSkillsMark, ExterierMark, ChildrenMark, ParentsMark, dogId) {
			return requestPromise(
				{
					method: "POST",
					url: "/api/judge/SetExhibitionMark",
					params: {
						WorkingSkillsMark: WorkingSkillsMark,
						ExterierMark: ExterierMark,
						ChildrenMark: ChildrenMark,
						ParentsMark: ParentsMark,
						ChildrenMark: ChildrenMark,
						dogId: dogId
					}

				});
		},
    };

    return service;
}]);