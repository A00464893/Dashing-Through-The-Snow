using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data;

namespace Backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserDataController : ControllerBase
    {
        private readonly ApiContext _context;

        public UserDataController(ApiContext context)
        {
            _context = context;
        }

        // Create/Edit
        [HttpPost]
        public async Task<ActionResult> Register(UserData booking)
        {
            var result = _context.user_data.Where(c => c.Username == booking.Username).FirstOrDefault();
            if (result == null) {
                _context.user_data.Add(booking);
                _context.SaveChanges();

                return getUserDataUsername(booking);
            }
            else
            {
                return BadRequest("User Already Exists");
            }
        }

        [HttpPost]
        public JsonResult getUserDataUsername(UserData userdata)
        {
            var result = _context.user_data.Where(c => c.Username == userdata.Username).First();
            return new JsonResult(Ok(result));
           
        }

        // Get
        [HttpPost]
        public async Task<ActionResult> Login(UserData userdata)
        {
            var result = _context.user_data.Where(c => c.Username==userdata.Username).FirstOrDefault();

            if (result == null)
                return Unauthorized();
            else if (result.password == userdata.password)
                return new JsonResult(Ok(result));
            else
                return BadRequest("Wrong Password");
        }

        [HttpPost]
        public JsonResult Update(UserData userdata)
        {

            _context.user_data.Update(userdata);
            _context.SaveChanges();
            return getUserDataUsername(userdata);
        }


        [HttpPost]
        public JsonResult UpdatePassword(UserData userdata)
        {
            String[] delimiters = { "@@@@@@@@" };
            String[] strlist = userdata.password.ToString().Split(delimiters,StringSplitOptions.None);

            var result = _context.user_data.Where(c => c.Username == userdata.Username && c.password == strlist[0]).FirstOrDefault();

            result.password = strlist[1];
            _context.user_data.Update(result);
            _context.SaveChanges();
            return getUserDataUsername(userdata);
        }

        // Delete
        [HttpDelete]
        public JsonResult Delete(int id)
        {
            var result = _context.user_data.Find(id);

            if (result == null)
                return new JsonResult(NotFound());

            _context.user_data.Remove(result);
            _context.SaveChanges();

            return new JsonResult(NoContent());
        }

        // Get all
        [HttpGet()]
        public JsonResult GetAll()
        {
            var result = _context.user_data.ToList();

            return new JsonResult(Ok(result));
        }
       
    }
}
