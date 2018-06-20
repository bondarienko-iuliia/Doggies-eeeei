using DarkSide;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Dapper;
using System.Data;

namespace Doggies.Models.Field
{
    public class myUserManager : Manager
    {

        public myUserManager(Concrete concrete) : base(concrete) { }

        public async Task<myUser> GetUserById(int id)
        {
            myUser user = null;
            try
            {
                using (var cnt = await Concrete.OpenConnectionAsync())
                {
                    user = (await cnt.QueryAsync<myUser>(
                        sql: "dbo.GetUserById",
                        commandType: CommandType.StoredProcedure,
                        param: new
                        {
                            id
                        }
                        )).FirstOrDefault();
                }
            }
            catch (Exception e)
            {
                var t = 1;
            }
            return user;
        }

        public async Task<List<Event>> GetEventsByUserId(int id)
        {


            List<Event> events = null;

            using (var cnt = await Concrete.OpenConnectionAsync())
            {
                events = (await cnt.QueryAsync<Event>(
                   sql: "dbo.GetEventsByUserId",
                   commandType: CommandType.StoredProcedure,
                   param: new
                   {
                       id
                   }
                   )).ToList();
            }


            return events;
        }
        public async Task<List<Event>> addUser(int id)
        {
            using (var cnt = await Concrete.OpenConnectionAsync())
            {
                await cnt.ExecuteAsync(
                   sql: "dbo.addUser",
                   commandType: CommandType.StoredProcedure,
                   param: new
                   {
                       id
                   }
                   );
            }
            return null;
        }
        public async Task<DogsEvent> GetDogsAndEventsById(int dogId, int eventId)//хранимая процедура получения всех событий
        {
            DogsEvent result = new DogsEvent();
            using (var cnt = await Concrete.OpenConnectionAsync())
            {
                var multi = await cnt.QueryMultipleAsync(
                   sql: "GetDogsAndEventsById",
                   commandType: CommandType.StoredProcedure,
                param: new
                {
                    DogId = dogId,//то,что в хранимой = тому,что придет
                    EventId = eventId
                }
                   );

                result.dogs = multi.Read<Dog>().ToList();
                result.events = multi.Read<Event>().First();

            }
            return result;
        }
        public async Task<myDocument> GetInfoForDocument(int eventId, int dogId, int userId )//хранимая процедура получения всех событий
        {
            myDocument result = new myDocument();
            //получить данные из forDocument (js)
            using (var cnt = await Concrete.OpenConnectionAsync())
            {
               result = (await cnt.QueryAsync<myDocument>(
                   sql: "dbo.ForDocument",
                   commandType: CommandType.StoredProcedure,
                   param: new
                   {
                       EventId = eventId,
                       UserId = userId,
                       DogId = dogId
                   }
                   )).First();
            }
            return result;
        }
        /// <summary>
        /// -заполняет список собак пользователят
        /// -заполняет список мероприятий собак
        /// </summary>
        /// <param name="id">id пользователя</param>
        /// <returns>пользователя(из него можно получить список его собак=> из которого список событий,в которых участвует собака )</returns>
        public async Task<myUser>FillDogsAndEventsLists(int id)
        {

            using (var cnt = await Concrete.OpenConnectionAsync())
            {
               
                var multi = await cnt.QueryMultipleAsync(
                    sql: "GetWholeUserInfoByUserId",
                    commandType: CommandType.StoredProcedure,
                    param: new { id }
                    );

                myUser user = new myUser();
                user = multi.Read<myUser>().First(); //
                user.Dogs = multi.Read<Dog>().ToList();//записали собак в список собак конкретного пользователя
                List<Event> events = multi.Read<Event>().ToList();//список всех мероприятий, в которых участвуют собаки пользователя
                List<Participation> participation = multi.Read<Participation>().ToList();// список всех участий собак пользователя

                foreach (var dog in user.Dogs)
                {
                    /// !!!!--------------доделать----------------!!!!

                    ///!!!!---------------------------------------!!!!
                    foreach (var p in participation)
                    {
                        if (dog.DogId == p.DogId)
                        {
                            //добавить мероприятие в список мероприятий 
                            //если EventId совпадает c EventId в participation
                            dog.Events = (events.Where(e => e.EventId == p.EventId)).ToList(); 

                        }
                    }
                }
                return user;
            }

        }
        public async Task<List<myUser>> newUserInfo(int userId, string userName, string userSurname, string userPatronymic, string region, string city, string address)
        {


            using (var cnt = await Concrete.OpenConnectionAsync())
            {
                await cnt.ExecuteAsync(
                   sql: "dbo.newUserInfo",
                   commandType: CommandType.StoredProcedure,
                   param: new
                   {
                       UserId = userId,
                       UserName = userName,
                       UserSurname = userSurname,
                       UserPatronymic = userPatronymic,
                       Region = region,
                       City = city,
                       Address = address
                   }
                   );
            }
            return null;
        }

        
    }
}