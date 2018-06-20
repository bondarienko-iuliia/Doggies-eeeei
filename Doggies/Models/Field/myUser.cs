using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Doggies.Models.Field
{
    public class myUser
    {
        public myUser() { Dogs = new List<Dog>(); }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Patronymic { get; set; }
        public string Region{ get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string TelephonNumber { get; set; }
        public string Email { get; set; }
        public List<Dog> Dogs { get; set; }
    }
}