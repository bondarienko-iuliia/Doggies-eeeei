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
    [RoutePrefix("api/organization")]
    public class OrganizationController:BaseApiController
    {
        [AllowAnonymous]
        [Route("GetInfoForRequestApprovalByOrganizationId")]
        [HttpPost]
        public async Task<IHttpActionResult> GetInfoForRequestApprovalByOrganizationId()
        {
            /////////////меняяяяяяяяяяяяяяяяяяяяять на currentUserId
            List<object> forApproval = await OrganizationManager.GetInfoForRequestApprovalByOrganizationId(1);
            return WrapSuccess(forApproval);
        }
        [AllowAnonymous]
        [Route("SetRequestApprovalState")]
        [HttpPost]
        public async Task<IHttpActionResult> SetRequestApprovalState(int eventId, int dogId, int state)
        {
            await OrganizationManager.SetRequestApprovalState(eventId, dogId, state);
            return WrapSuccess();
        }

        protected OrganizationManager OrganizationManager
        {

            get
            {
                return Request.GetOwinContext().Get<OrganizationManager>();
            }
        }
    }
}