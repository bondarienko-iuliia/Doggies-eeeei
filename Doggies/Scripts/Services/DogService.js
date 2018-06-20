webApp.factory("DogService", [
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

        newUserInfo: function (UserName, UserSurname, UserPatronymic, Region, City, Address) {
            return requestPromise({
                method: "POST",
                url: "/api/user/newUserInfo",
                data: {
                    UserName: UserName,
                    UserSurname: UserSurname,
                    UserPatronymic: UserPatronymic,
                    Region: Region,
                    City: City,
                    Address: Address
                }
            });
        },
        addDog: function (DogName, VpkosOrLicenceNumber, IsMale, Color, Breed, DateOfBirth, MotherId, FatherId) {
            return requestPromise({
                method: "POST",
                url: "/api/dog/addDog",
                data: {
                    DogName: DogName,
                    VpkosOrLicenceNumber: VpkosOrLicenceNumber,
                    IsMale: IsMale,
                    Color: Color,
                    Breed: Breed,
                    DateOfBirth: DateOfBirth,
                    MotherId: MotherId,
                    FatherId: FatherId
                }
            });
        },
    };

    return service;
}]);