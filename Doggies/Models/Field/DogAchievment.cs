using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Doggies.Models.Field
{
    public class DogAchievment
    {
        public int DogAchievmentId { get; set; }
        public string Class { get; set; }
        public string ExterierMark { get; set; }
        public double ExterierBall { get; set; }
        public int DogId { get; set; }
    }
}