using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DarkSide
{
    public static class Extender
    {
        public static TOut IfNotNull<TBase, TOut>(this TBase obj, Func<TBase, TOut> func)
            where TBase : class
            where TOut : class
        {
            return (obj != null) ? func(obj) : (TOut)null;
        }
        public static void Do<T>(this T source, Action<T> action)
            where T : class
        {
            if (source == null || action == null)
            {
                return;
            }

            action(source);
        }
        public static T IfNull<T>(this T source, T value)
            where T : class
        {
            return source ?? value;
        }
        public static object ToDynamic(this Dictionary<string, object> dic)
        {
            IDictionary<string, object> result = (IDictionary<string, object>)new ExpandoObject();

            foreach (KeyValuePair<string, object> pair in dic)
            {
                (result[pair.Key]) = pair.Value;
            }

            return result;
        }

        public static IDictionary<string, object> ToDictionary(this object source)
        {
            Dictionary<string, object> result = new Dictionary<string, object>();

            foreach (System.Reflection.PropertyInfo fi in source.GetType().GetProperties())
            {
                result[fi.Name] = fi.GetValue(source, null);
            }

            return result;
        }
    }
}
