using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CartItemController : ControllerBase
    {
        private readonly ApiContext _context;

        public CartItemController(ApiContext context)
        {
            _context = context;
        }



        [HttpPost]
        public JsonResult GetItemsByUsername(CartItem username)
        {
            var result = _context.cart_item.Where(c => c.Username == username.Username).ToList();

            if (result == null)
                return new JsonResult(NotFound());

            return new JsonResult(Ok(result));
        }

        // Create/Edit
        [HttpPost]
        public JsonResult AddCartItem(CartItem item)
        {
            
                _context.cart_item.Add(item);
            

            _context.SaveChanges();

            return GetItemsByUsername(item);

        }
        [HttpPost]
        public JsonResult DeleteCartItemByUsername(CartItem item)
        {
            _context.cart_item.Where(c => c.Username == item.Username).ExecuteDelete();

            _context.SaveChanges();

            return new JsonResult(Ok());
        }







        // Delete
        [HttpPost]
        public JsonResult DeleteCartItem(CartItem item)
        {
            var result = _context.cart_item.Find(item.Id);

            _context.cart_item.Remove(result);
            _context.SaveChanges();

            return GetItemsByUsername(item);
        }

        // Get all
        [HttpGet()]
        public JsonResult GetAll()
        {
            var result = _context.cart_item.ToList();

            return new JsonResult(Ok(result));
        }
       
    }
}
