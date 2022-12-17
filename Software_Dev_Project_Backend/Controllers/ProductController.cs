using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data;

namespace Backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApiContext _context;

        public ProductController(ApiContext context)
        {
            _context = context;
        }

        // Create/Edit
        [HttpPost]
        public JsonResult CreateEdit(Product prod)
        {
            
                _context.product.Add(prod);
            

            _context.SaveChanges();

            return new JsonResult(Ok(prod));

        }


      

        // Get
        [HttpPost]
        public JsonResult Get(Product id)
        {
            var result = _context.product.Find(id.Id);

            if (result == null)
                return new JsonResult(NotFound());

            return new JsonResult(Ok(result));
        }

        // Delete
        [HttpDelete]
        public JsonResult Delete(string id)
        {
            var result = _context.product.Find(id);

            if (result == null)
                return new JsonResult(NotFound());

            _context.product.Remove(result);
            _context.SaveChanges();

            return new JsonResult(NoContent());
        }

        // Get all
        [HttpGet()]
        public JsonResult GetAll()
        {
            var result = _context.product.ToList();

            return new JsonResult(Ok(result));
        }
       
    }
}
