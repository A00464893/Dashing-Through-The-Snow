using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data;

namespace Backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserAddressController : ControllerBase
    {
        private readonly ApiContext _context;

        public UserAddressController(ApiContext context)
        {
            _context = context;
        }

        [HttpPost]
        public JsonResult GetAddressByUsername(UserAddress userdata)
        {
            var result = _context.user_address.Where(c => c.username == userdata.username).ToList();

            if (result == null)
                return new JsonResult(NotFound());
            else
            {
                return new JsonResult(Ok(result));

            }

        }
        // Create/Edit
        [HttpPost]
        public JsonResult AddAddress(UserAddress address)
        {
            
                _context.user_address.Add(address);
            

            _context.SaveChanges();

            return GetAddressByUsername(address);

        }

        

        // Get
        [HttpGet]
        public JsonResult Get(int id)
        {
            var result = _context.user_address.Find(id);

            if (result == null)
                return new JsonResult(NotFound());

            return new JsonResult(Ok(result));
        }

        // Delete
        [HttpPost]
        public JsonResult DeleteAddress(UserAddress address)
        {
            var result = _context.user_address.Find(address.id);

            if (result == null)
                return new JsonResult(NotFound());

            _context.user_address.Remove(result);
            _context.SaveChanges();

            return GetAddressByUsername(address);
        }

        // Get all
        [HttpGet()]
        public JsonResult GetAll()
        {
            var result = _context.user_address.ToList();

            return new JsonResult(Ok(result));
        }
       
    }
}
