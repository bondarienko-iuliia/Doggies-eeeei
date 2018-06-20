using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DarkSide
{
    public class StructuredDynamicParameters
    {

        private IDictionary<string, object> param;
        public StructuredDynamicParameters(object param)
        {
            if (param == null) throw new ArgumentNullException("param");
            //this.param = new RouteValueDictionary(param);
            this.param = param.ToDictionary();
        }
    }
}
