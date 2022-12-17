using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data;

namespace Backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApiContext _context;

        public OrdersController(ApiContext context)
        {
            _context = context;
        }

        // Create/Edit
        [HttpPost]
        public JsonResult AddOrder(Orders order)
        {
            
            _context.orders.Add(order);
            _context.SaveChanges();
            var result = _context.orders.Where(x => x.Payment_id == order.Payment_id).FirstOrDefault();

            return new JsonResult(Ok(result));

        }
        [HttpPost]
        public JsonResult getOrderDataByUsername(Orders userdata)
        {
            var result = _context.orders.Where(c => c.Username == userdata.Username).ToList();
            return new JsonResult(Ok(result));

        }
        // Get
        [HttpGet]
        public JsonResult Get(int id)
        {
            var result = _context.orders.Find(id);

            if (result == null)
                return new JsonResult(NotFound());

            return new JsonResult(Ok(result));
        }

      

        
       
    }
}
