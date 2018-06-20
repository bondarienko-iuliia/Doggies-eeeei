using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Doggies.Models.Field
{
    public class Participation
    {

        public int ParticipationId { get; set; }
        public int DogId { get; set; }
        public int EventId { get; set; }
    }
    
}