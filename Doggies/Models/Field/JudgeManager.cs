using Dapper;
using DarkSide;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Doggies.Models.Field
{
    public class JudgeManager : Manager
    {
        public JudgeManager(Concrete concrete) : base(concrete) { }

        #region Состязания  
        public async Task<List<Event>> GetAllEvents()
        {
            List<Event> events = null;
            using (var cnt = await Concrete.OpenConnectionAsync())
            {
                events = (await cnt.QueryAsync<Event>(
                     sql: "dbo.GetAllEvents",
                     commandType: CommandType.StoredProcedure

                     )).ToList();
            }
            return events;
        }
        public async Task SetChallengeValue(int dogId, string challengeName, decimal challengeValue)
        {
            using (var cnt = await Concrete.OpenConnectionAsync())
            {
                await cnt.ExecuteAsync(
                   sql: "dbo.SetChallengeValue",
                   commandType: CommandType.StoredProcedure,
                   param: new
                   {
                       dogId,
                       challengeName,
                       challengeValue
                   }
               );
            }

        }
        public async Task<List<Dog>> GetDogsByEventId(int id)
        {
            List<Dog> dogs = null;
            using (var cnt = await Concrete.OpenConnectionAsync())
            {
                dogs = (await cnt.QueryAsync<Dog>(
                     sql: "dbo.GetDogsByEventId",
                     commandType: CommandType.StoredProcedure,
                     param: new { id }

                     )).ToList();
            }
            return dogs;
        }
        #endregion
        #region Выставка
        public async Task<List<object>> FillListsForExhebition(int eventId)
        {

            using (var cnt = await Concrete.OpenConnectionAsync())
            {

                var multi = await cnt.QueryMultipleAsync(
                    sql: "DogsInExhebitionWhithDiplomaAndAchievment",
                    commandType: CommandType.StoredProcedure,
                    param: new { eventId }
                    );

                List<Dog> dogs = multi.Read<Dog>().ToList();
              
                List<myUser> users = multi.Read<myUser>().ToList();
                List<Diploma> diploma = multi.Read<Diploma>().ToList();
                List<DogAchievment> dogAchievements = multi.Read<DogAchievment>().ToList();

                List<object> allINeed = new List<object>();//то что вернет запроc (*список собак с их родителями и детьми и *список владельцев всех собак )
                foreach (Dog dog in dogs)
                {
                    foreach (Diploma dip in diploma)
                    {
                        if (dog.DogId == dip.DogId)
                        {
                            dog.Diploma.Add(dip);

                        }
                    }
                    foreach (DogAchievment dogAch in dogAchievements)
                    {
                        if (dog.DogId == dogAch.DogId)
                        {
                            dog.DogAchievment.Add(dogAch);

                        }
                    }


                    // прикрепляем к собаким родителей
                    foreach (Dog dog2 in dogs)
                    {
                        if (dog.MotherId == dog2.DogId)
                        {
                            dog.Mother = dog2;
                        }
                        if (dog.FatherId == dog2.DogId)
                            dog.Father = dog2;



                    }


                }
      
                allINeed.Add(dogs);
         
                allINeed.Add(users);

                return allINeed;
            }

        }

        #endregion
    }
}