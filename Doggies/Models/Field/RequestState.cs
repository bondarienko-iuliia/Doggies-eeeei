using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Doggies.Models.Field
{
    public class RequestState
    {
        public int DogId { get; set; }
        public int EventId { get; set; }
        public int RequestApprovalState { get; set; }
    }
}