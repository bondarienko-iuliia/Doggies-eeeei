using Doggies.Controllers.Abstract;
using Doggies.Models;
using Doggies.Models.Field;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Doggies.Controllers.Api
{
    [NotRedirectWebApiAuthorize]
    [RoutePrefix("api/judge")]
    public class JudgeController : BaseApiController
    {
        [AllowAnonymous]
        [Route("GetAllEvents")]
        [HttpPost] 
        
        //!!!!------уменьшить объем возвращаемой информации----------
        public async Task<IHttpActionResult> GetAllEvents()
        {
            List<Event> events = await JudgeManager.GetAllEvents();
            return WrapSuccess(events);
        }
        [AllowAnonymous]
        [Route("SetChallengeValue")]
        [HttpPost]
        public async Task<IHttpActionResult> SetChallengeValue(int dId, string chName, decimal chValue)
        {
            await JudgeManager.SetChallengeValue(dId, chName, chValue);
            return WrapSuccess();
        }

        [AllowAnonymous]
        [Route("GetDogsByEventId")]
        [HttpPost]
        //!!!!-----уменьшить объем возвращаемой информации-----------
        public async Task<IHttpActionResult> GetDogsByEventId(int id)
        {
            List<Dog> dogs = await JudgeManager.GetDogsByEventId(id);
            return WrapSuccess(dogs);
        }

        [AllowAnonymous]
        [Route("FillListsForExhebition")]
        [HttpPost]
        public async Task<IHttpActionResult> FillListsForExhebition(int eventId)
        {
            List<object> users= await JudgeManager.FillListsForExhebition(eventId);
            return WrapSuccess(users);
        }
        protected JudgeManager JudgeManager
        {
            get
            {
                return Request.GetOwinContext().Get<JudgeManager>();
            }
        }
    }
}