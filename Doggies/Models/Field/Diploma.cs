using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Doggies.Models.Field
{
    public class Diploma
    {
        public int DiplomaId { get; set; }
        public string DiplomaName { get; set; }
        public string DiplomaDegree { get; set; }
        public double DiplomaBall { get; set; }
        public int DogId { get; set; }
    }
}