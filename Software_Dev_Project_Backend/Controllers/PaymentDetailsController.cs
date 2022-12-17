using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data;

namespace Backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PaymentDetailsController : ControllerBase
    {
        private readonly ApiContext _context;

        public PaymentDetailsController(ApiContext context)
        {
            _context = context;
        }

        // Create/Edit
        [HttpPost]
        public JsonResult AddPayment(PaymentDetails details)
        {
            _context.payment_details.Add(details);


            _context.SaveChanges();
            var result = _context.payment_details.Where(x => x.Transaction_id == details.Transaction_id).FirstOrDefault();

            return new JsonResult(Ok(result));


        }

        // Get
        [HttpGet]
        public JsonResult Get(int id)
        {
            var result = _context.payment_details.Find(id);

            if (result == null)
                return new JsonResult(NotFound());

            return new JsonResult(Ok(result));
        }

        // Delete
        [HttpDelete]
        public JsonResult Delete(int id)
        {
            var result = _context.payment_details.Find(id);

            if (result == null)
                return new JsonResult(NotFound());

            _context.payment_details.Remove(result);
            _context.SaveChanges();

            return new JsonResult(NoContent());
        }

        // Get all
        [HttpGet()]
        public JsonResult GetAll()
        {
            var result = _context.payment_details.ToList();

            return new JsonResult(Ok(result));
        }
       
    }
}
