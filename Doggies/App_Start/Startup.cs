using System;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Google;
using Owin;
using Doggies.Models;
using System.Configuration;
using DarkSide;
using Doggies.Models.Field;

namespace Doggies
{
    public partial class Startup
    {
        
        public void Configuration(IAppBuilder app)
        {
            app.CreatePerOwinContext<Concrete>(CreateConcrete);
            ConfigureAuth(app);
            DomainConfiguration(app);
        }

        public void ConfigureAuth(IAppBuilder app)
        {
            app.CreatePerOwinContext<ApplicationDbContext>(() => ApplicationDbContext.Create(ConnectionName));

            app.CreatePerOwinContext<UserManager>(UserManager.Create);

            app.CreatePerOwinContext<RoleManager>(RoleManager.Create);


            // Enable the application to use a cookie to store information for the signed in user
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/account/login")
            });
        }
        public void DomainConfiguration(IAppBuilder app)
        {
            app.CreatePerOwinContext<DogManager>((IdentityFactoryOptions<DogManager> options, IOwinContext context) =>
            {
                return new DogManager(context.Get<Concrete>());
            });
            app.CreatePerOwinContext<myUserManager>((IdentityFactoryOptions<myUserManager> options, IOwinContext context) =>
            {
                return new myUserManager(context.Get<Concrete>());
            });
            app.CreatePerOwinContext<JudgeManager>((IdentityFactoryOptions<JudgeManager> options, IOwinContext context) =>
            {
                return new JudgeManager(context.Get<Concrete>());
            });
            app.CreatePerOwinContext<OrganizationManager>((IdentityFactoryOptions<OrganizationManager> options, IOwinContext context) =>
            {
                return new OrganizationManager(context.Get<Concrete>());
            });
            app.CreatePerOwinContext<RequestManager>((IdentityFactoryOptions<RequestManager> options, IOwinContext context) =>
            {
                return new RequestManager(context.Get<Concrete>());
            });
            app.CreatePerOwinContext<DocumentCreatorManager>((IdentityFactoryOptions<DocumentCreatorManager> options, IOwinContext context) =>
            {
                return new DocumentCreatorManager(context.Get<Concrete>());
            });
        }
     

        /// <summary>
        /// Имя строки соединения с БД
        /// </summary>
        public string ConnectionName
        {
            get
            {
                return ConfigurationManager.AppSettings["sys:connectionName"];
            }
        }

        /// <summary>
        /// Получаем из "Web.config" информацию о подключении
        /// </summary>
        /// <returns>Объект строки соединения</returns>
        public ConnectionStringSettings GetConnectionStringSettings()
        {
            return ConfigurationManager.ConnectionStrings[ConnectionName];
        }

        /// <summary>
        /// Создает объект управления подключением к БД
        /// </summary>
        public Concrete CreateConcrete(IdentityFactoryOptions<Concrete> options, IOwinContext context)
        {
            return new Concrete(GetConnectionStringSettings());
        }
    }
}