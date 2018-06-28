using Dapper;
using DarkSide;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Doggies.Models.Field
{
    public class DocumentCreatorManager : Manager
    { public DocumentCreatorManager(Concrete concrete) : base(concrete) { }
        
        //получаем мероприятия, организуемые данной организацией

        public async Task<List<Event>> GetEventsForDecentPeriodByOrganizationId(int OrganizationId, string startDate, string endDate)
        {
            List<Event> events = null;
            using (var cnt = await Concrete.OpenConnectionAsync())
            {
                events = (await cnt.QueryAsync<Event>(
                     sql: "dbo.GetEventsForDecentPeriodByOrganizationId",
                     commandType: CommandType.StoredProcedure,
                       param: new
                       {
                           OrganizationId,
                           startDate,
                           endDate
                       }
                     )).ToList();
            }
            return events;
        }
        //получаем инф-цию об участниках, заявка на которих была оформлена
       
        public async Task <List<object>> DogsInExhebitionWhithDiplomaAndAchievment(int eventId)
        {
            using (var cnt = await Concrete.OpenConnectionAsync())
            {
                var multi = await cnt.QueryMultipleAsync(
                        sql: "dbo.DogsInExhebitionWhithDiplomaAndAchievment",
                        commandType: CommandType.StoredProcedure,
                         param: new
                         {
                             eventId
                         }
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

                allINeed.Add(dogs);// собаки с родителями и достижениями

                allINeed.Add(users);// просто пользователи

                return allINeed;
            }


        }




}
}