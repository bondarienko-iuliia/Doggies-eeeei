using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Doggies.Models.Field
{
    public class Event
    {
        public int EventId { get; set; }
        public int OrganizationId { get; set; }
        public DateTime Date { get; set; }
        public string EventName { get; set; }
        public int EventType { get; set; }
       
    }
}