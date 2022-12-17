using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data;

namespace Backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        private readonly ApiContext _context;

        public OrderDetailsController(ApiContext context)
        {
            _context = context;
        }

        // Create/Edit
        [HttpPost]
        public JsonResult AddOrderDetails(OrderDetails details)
        {
            
                _context.order_details.Add(details);
            

            _context.SaveChanges();

            return new JsonResult(Ok());

        }

        // Get
        [HttpPost]
        public JsonResult getOrderDetailsByOrderID(OrderDetails userdata)
        {
            var result = _context.order_details.Where(c => c.Order_id == userdata.Order_id).ToList();
            return new JsonResult(Ok(result));
        }

        // Delete
        [HttpDelete]
        public JsonResult Delete(int id)
        {
            var result = _context.order_details.Find(id);

            if (result == null)
                return new JsonResult(NotFound());

            _context.order_details.Remove(result);
            _context.SaveChanges();

            return new JsonResult(NoContent());
        }

        // Get all
        [HttpGet()]
        public JsonResult GetAll()
        {
            var result = _context.order_details.ToList();

            return new JsonResult(Ok(result));
        }
       
    }
}
