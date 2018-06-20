using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Http;
using Doggies.Models;
using Microsoft.AspNet.Identity.Owin;
using System.Security.Claims;
using DarkSide;
using System.Web.Http;
using Microsoft.AspNet.Identity;

namespace Doggies.Controllers.Abstract
{
    public abstract class BaseApiController : ApiController
    {
        protected string GetCurrentDomain()
        {
            return Request.RequestUri.Authority;
        }

        protected IAuthenticationManager AuthManager
        {
            get
            {
                return Request.GetOwinContext().Authentication;
            }
        }
        protected RoleManager RoleManager
        {
            get
            {
                return Request.GetOwinContext().Get<RoleManager>();
            }
        }

        protected UserManager UserManager
        {
            get
            {
                return Request.GetOwinContext().GetUserManager<UserManager>();
            }
        }
        public User CurrentUser
        {
            get
            {
                return UserManager.FindByName(User.Identity.Name);
            }
        }

        private List<ApiResponseWrap.Message> ResponseMessages = new List<ApiResponseWrap.Message>();

        public void SetResponseMessage(ApiResponseWrap.MessageType type, string body)
        {
            ResponseMessages.Add(new ApiResponseWrap.Message(type, body));
        }
        public IHttpActionResult WrapError(string message)
        {
            SetResponseMessage(ApiResponseWrap.MessageType.error, message);
            return WrapResponse(null, ApiResponseWrap.ResponseState.Error);
        }

        public IHttpActionResult WrapSuccess(object data = null)
        {
            return WrapResponse(data, ApiResponseWrap.ResponseState.Success);
        }

        public IHttpActionResult WrapResponse(object data, ApiResponseWrap.ResponseState state)
        {
            return WrapResponse(data, state, new ApiResponseWrap.Message[0]);
        }

        public IHttpActionResult WrapResponse(object data, ApiResponseWrap.ResponseState state, ApiResponseWrap.Message message)
        {
            return WrapResponse(data, state, message.IfNotNull(a => new ApiResponseWrap.Message[] { message }).IfNull(new ApiResponseWrap.Message[0]));
        }

        public IHttpActionResult WrapResponse(object data, ApiResponseWrap.ResponseState state, IEnumerable<ApiResponseWrap.Message> messages)
        {
            // добавляем сообщения, если надо
            messages.Do(a => ResponseMessages.AddRange(a));

            return Json(new ApiResponseWrap(state, data, ResponseMessages));
        }
    }
}