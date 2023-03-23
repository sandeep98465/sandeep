using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    public class ContactController : Controller
    {
       public ActionResult Index()
        {
            return View();
        }
        public IActionResult Contact()
        {
            return View();
        }
    }
}
