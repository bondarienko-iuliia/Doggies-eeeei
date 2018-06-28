using Doggies.Controllers.Abstract;
using Doggies.Models.Field;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using Microsoft.AspNet.Identity.Owin;
using Doggies.Models;
using System.Web.Http;
using System.Threading.Tasks;
namespace Doggies.Controllers.Api
{
    [NotRedirectWebApiAuthorize]
    [AllowAnonymous]
    [RoutePrefix("api/documentCreator")]
    public class DocumentCreatorController : BaseApiController
    {
        [AllowAnonymous]
        [Route("GetEventsForDecentPeriodByOrganizationId")]
        [HttpPost]
        public async Task<IHttpActionResult> GetEventsForDecentPeriodByOrganizationId(int OrganizationId, string startDate, string endDate)
        {
        List<Event> events=  await DocumentCreatorManager.GetEventsForDecentPeriodByOrganizationId(OrganizationId, startDate, endDate);
            return WrapSuccess(events);
        }
        [AllowAnonymous]
        [Route("DogsInExhebitionWhithDiplomaAndAchievment")]
        [HttpPost]
        public async Task<IHttpActionResult> DogsInExhebitionWhithDiplomaAndAchievment(int eventId)
        {
            /////////////меняяяяяяяяяяяяяяяяяяяяять на currentUserId
            List<object> forExhibition = await DocumentCreatorManager.DogsInExhebitionWhithDiplomaAndAchievment(eventId);
            return WrapSuccess(forExhibition);
        }

        protected DocumentCreatorManager DocumentCreatorManager
        {

            get
            {
                return Request.GetOwinContext().Get<DocumentCreatorManager>();
            }
        }
    }
}