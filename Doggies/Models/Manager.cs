using DarkSide;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Doggies.Models
{
    public abstract class Manager : IDisposable
    {
        protected Concrete Concrete { get; private set; }

        /// <summary>
        /// Объект сам создал контроллер соеденения с БД
        /// </summary>
        private bool SelfConcrete { get; set; }

        public Manager(ConnectionStringSettings settings)
        {
            SelfConcrete = true;
            Concrete = new Concrete(settings);
        }

        public Manager(Concrete concrete)
        {
            SelfConcrete = false;
            Concrete = concrete;
        }

        public void Dispose()
        {
            // чистим только если сами создали
            if (SelfConcrete) Concrete.Dispose();
        }
    }
}