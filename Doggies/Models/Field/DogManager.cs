using DarkSide;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Dapper;

namespace Doggies.Models.Field
{
    public class DogManager : Manager
    {
        public DogManager(Concrete concrete) : base(concrete) { }

        public async Task<List<Dog>> GetDogs()//хранимая процедура получения всех собак 
        {
            List<Dog> dogs = null;
            using (var cnt = await Concrete.OpenConnectionAsync())
            {
                dogs = (await cnt.QueryAsync<Dog>(
                    sql: "getDogs",
                    commandType: CommandType.StoredProcedure
                    )).ToList();
            }
            return dogs;
        }
        public async Task<List<Dog>> addDog(string dogName, string vpkosOrLicenceNumber, bool isMale, string color, string breed, DateTime dateOfBirth, int userId, int motherId, int fatherId)
        {


            using (var cnt = await Concrete.OpenConnectionAsync())
            {
                await cnt.ExecuteAsync(
                   sql: "addDog",
                   commandType: CommandType.StoredProcedure,
                   param: new
                   {
                       DogName = dogName,
                       VpkosOrLicenceNumber = vpkosOrLicenceNumber,
                       IsMale = isMale,
                       Color = color,
                       Breed = breed,
                       DateOfBirth = dateOfBirth,
                       UserId = userId,
                       MotherId = motherId,
                       FatherId = fatherId
                   }
                   );
            }
            return null;
        }

    }
}