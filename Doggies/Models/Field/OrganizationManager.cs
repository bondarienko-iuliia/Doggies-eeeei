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
    public class OrganizationManager : Manager
    {
        public OrganizationManager(Concrete concrete) : base(concrete) { }

        public async Task<List<object>> GetInfoForRequestApprovalByOrganizationId(int organivationId)
        {
         
            List<myUser> users = null;
            List<Dog> dogs = null;
            List<RequestState> states = new List<RequestState>();
            List<Event> events = new List<Event>();
            List<object> forApproval = new List<object>();
            using (var cnt = await Concrete.OpenConnectionAsync())
            {
             var   multi = await cnt.QueryMultipleAsync(
                     sql: "dbo.GetInfoForRequestApprovalByOrganizationId",
                     commandType: CommandType.StoredProcedure,
                      param: new
                      {
                          organivationId

                      }
                     );
                users = multi.Read<myUser>().ToList();
                dogs = multi.Read<Dog>().ToList();
                states = multi.Read<RequestState>().ToList();
                events = multi.Read<Event>().ToList();
                foreach (myUser u in users)
                {
                    foreach (Dog d in dogs)
                    {
                        if (d.UserId == u.Id)
                        {
                            u.Dogs.Add(d);
                            foreach(RequestState state in states)
                            {
                                if(d.DogId==state.DogId)
                                d.RequestStates.Add(state);
                              
                            }
                        }

                    }
                }
            }
             ;
          
          forApproval.Add(users);
            forApproval.Add(events);
            return forApproval;
        }

        public async Task SetRequestApprovalState(int eventId, int dogId, int state)
        {


            using (var cnt = await Concrete.OpenConnectionAsync())
            {
                await cnt.ExecuteAsync(
                   sql: "SetRequestApprovalState",
                   commandType: CommandType.StoredProcedure,
                   param: new
                   {

                       eventId,
                       dogId,
                       state
                   }
                   );
            }

        }
    }
}
