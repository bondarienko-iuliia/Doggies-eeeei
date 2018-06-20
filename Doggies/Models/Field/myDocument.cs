using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Doggies.Models.Field
{
    public class myDocument
    {
        public string OrganizationName { get; set; }

        public string EventName { get; set; }
        public string Date { get; set; }

        public string DogName { get; set; }
        public string VpkosOrLicenceNumber { get; set; }
        public string Breed { get; set; }
        public string Color { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool IsMale { get; set; }

        public string MotherName { get; set; }
        public string FatherName { get; set; }
        public string MotherLicense{ get; set; }
        public string FatherLicense { get; set; }

        public string Name { get; set; }
        public string Surname { get; set; }
        public string Patronymic { get; set; }
        public string Region { get; set; }
        public string City { get; set; }
        public string Address { get; set; }

        public string LeaderFIO{ get; set; }
       

    }
}