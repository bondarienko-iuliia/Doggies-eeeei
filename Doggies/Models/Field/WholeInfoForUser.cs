using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Doggies.Models.Field
{
    public class WholeInfoForUser
    {
        public myUser myUser { get; set; }
        public List<Dog> Dogs { get; set; }
        public List<Event> Events { get; set; }
        public List<Participation> Participation { get; set; }
    }
}