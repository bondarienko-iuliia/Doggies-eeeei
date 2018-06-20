using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Doggies.Models.Field
{
    public class Mark
    {
        public double MarkId { get; set; }
        public double DogId { get; set; }
        public string AreaDistrict { get; set; }
        public double MainMark { get; set; }
        public double AdditionlMark { get; set; }
        public double UniversalityMark { get; set; }
        public double ResultMark { get; set; }
        public double ExterierMark { get; set; }
        public double ChildrenMark { get; set; }
        public double ParentsMark { get; set; }
        public bool Master { get; set; }
        public bool FirstClass { get; set; }
        public bool SecondClass { get; set; }
        public bool ThirdClass { get; set; }
        public bool OutOfClass { get; set; }
        public double Rank { get; set; }
        public string Medal { get; set; }
        public string Comments { get; set; }
    }
}