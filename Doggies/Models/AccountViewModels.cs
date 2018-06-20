using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Doggies.Models
{
    public class LoginModel
    {
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }
    }
    public class RegisterModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Name { get; set; }

    }
    public class NewUserInfoModel
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public string UserName { get; set; }

        public string UserSurname { get; set; }

        public string UserPatronymic { get; set; }

        public string Region { get; set; }

        public string City { get; set; }

        public string Address { get; set; }
    }
}
