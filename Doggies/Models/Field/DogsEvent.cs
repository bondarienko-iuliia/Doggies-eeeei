using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Doggies.Models.Field
{
    public class DogsEvent
    {
       public List<Dog> dogs { get; set; }
       public Event events { get; set; }
    }
}