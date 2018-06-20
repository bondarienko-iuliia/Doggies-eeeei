using DarkSide;
using Doggies.Models.Field;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity.Owin;
using Doggies.Controllers.Abstract;
using Doggies.Models;

namespace WepApp.Controllers.Api
{
    [NotRedirectWebApiAuthorize]
    [AllowAnonymous]
    [RoutePrefix("api/dog")]
    public class DogController : BaseApiController
    {
        [AllowAnonymous]
        [Route("getDogs")]
        [HttpPost]
        public async Task<IHttpActionResult> getDogs()
        {
            List<Dog> allDogs = await DogManager.GetDogs();
            return WrapSuccess(allDogs);
        }
        [AllowAnonymous]
        [Route("addDog")]
        [HttpPost]
        public async Task<IHttpActionResult> addDog(Dog model)
        {
            var temp = await DogManager.addDog(model.DogName, model.VpkosOrLicenseNumber, model.IsMale, model.Color, model.Breed, model.DateOfBirth,CurrentUser.Id, model.MotherId, model.FatherId);
            return WrapSuccess();
        }
        protected DogManager DogManager
        {
            get
            {
                return Request.GetOwinContext().Get<DogManager>();
            }
        }
        
    }
}