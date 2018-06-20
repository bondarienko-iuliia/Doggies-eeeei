using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Doggies.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index(string query)
        {
            return View();
        }

        public ActionResult Template(string path)
        {
            return View("SPA/" + path);
        }
    }
}