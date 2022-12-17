using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data;

namespace Backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductCategoryController : ControllerBase
    {
        private readonly ApiContext _context;

        public ProductCategoryController(ApiContext context)
        {
            _context = context;
        }

        // Create/Edit
        [HttpPost]
        public JsonResult CreateEdit(ProductCategory category)
        {
            
                _context.product_category.Add(category);
            

            _context.SaveChanges();

            return new JsonResult(Ok(category));

        }

        // Get
        [HttpGet]
        public JsonResult Get(string id)
        {
            var result = _context.product_category.Find(id);

            if (result == null)
                return new JsonResult(NotFound());

            return new JsonResult(Ok(result));
        }

        // Delete
        [HttpDelete]
        public JsonResult Delete(string id)
        {
            var result = _context.product_category.Find(id);

            if (result == null)
                return new JsonResult(NotFound());

            _context.product_category.Remove(result);
            _context.SaveChanges();

            return new JsonResult(NoContent());
        }

        // Get all
        [HttpGet()]
        public JsonResult GetAll()
        {
            var result = _context.product_category.ToList();

            return new JsonResult(Ok(result));
        }
       
    }
}
