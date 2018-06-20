using System.Configuration;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace Doggies.Models
{
    public class UserLogin : IdentityUserLogin<int>
    {
        public UserLogin() : base() { }
    }

    public class UserRole : IdentityUserRole<int>
    {
        public UserRole() : base() { }
    }

    public class UserClaim : IdentityUserClaim<int>
    {
        public UserClaim() : base() { }
    }

    public class User : IdentityUser<int, UserLogin, UserRole, UserClaim>
    {
        public User() : base() { }
        
    }
    /// <summary>
    /// Тип роли доступа
    /// </summary>
    public class Role : IdentityRole<int, UserRole>
    {
        public string Name { get; set; }
        

        public Role() : base() { }
        
        public Role(string roleName)
            : base()
        {
            Name = roleName;
        }
    }
    public class RoleManager : RoleManager<Role, int>
    {
        public RoleManager(RoleStore store)
            : base(store)
        {
        }

        public static RoleManager Create(IdentityFactoryOptions<RoleManager> options, IOwinContext context)
        {
            return new RoleManager(new RoleStore(context.Get<ApplicationDbContext>()));
        }
    }
    public class RoleStore : RoleStore<Role, int, UserRole>
    {
        public RoleStore(DbContext context) : base(context) { }
    }
    /// <summary>
    /// Тип хранилища сущностей Identity
    /// </summary>
    public class UserStore : UserStore<User, Role, int, UserLogin, UserRole, UserClaim>
    {
        public UserStore(DbContext context) : base(context) { }
    }
    public class UserManager : UserManager<User, int>
    {
        public UserManager(IUserStore<User, int> store)
            : base(store)
        {
        }

        public static UserManager Create(IdentityFactoryOptions<UserManager> options, IOwinContext context)
        {
            ApplicationDbContext db = context.Get<ApplicationDbContext>();
            UserManager um = new UserManager(new UserStore(db));
            um.UserValidator = new UserValidator<User, int>(um) { AllowOnlyAlphanumericUserNames = false, RequireUniqueEmail = true };
            return um;
        }



    }

    public class IdentityDbInit : NullDatabaseInitializer<ApplicationDbContext> { }
    //public class IdentityDbInit : CreateDatabaseIfNotExists<ApplicationDbContext> { }

    public class ApplicationDbContext : IdentityDbContext<User, Role, int, UserLogin, UserRole, UserClaim>
    {
        static ApplicationDbContext()
        {
            Database.SetInitializer<ApplicationDbContext>(new IdentityDbInit());
        }

        public static ApplicationDbContext Create(string connStringName)
        {
            return new ApplicationDbContext(connStringName);
        }

        public ApplicationDbContext() : base(ConfigurationManager.AppSettings["sys:connectionName"]) { }

        public ApplicationDbContext(string connStringName)
            : base(connStringName)
        {
        }

    }
}