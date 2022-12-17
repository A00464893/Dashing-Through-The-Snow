using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data;

namespace Backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class GeoDetailsController : ControllerBase
    {
        private readonly ApiContext _context;

        public GeoDetailsController(ApiContext context)
        {
            _context = context;
        }

        // Create/Edit
        [HttpPost]
        public JsonResult GetCountry()
        {
            var results = _context.geo_details.Select(x => x.country).Distinct();
            return new JsonResult(Ok(results));
        }

        [HttpPost]
        public JsonResult GetProvinceByCountry(GeoDetails geo)
        {
            var results = _context.geo_details.Where(a=>a.country == geo.country).Select(x => x.province).Distinct();
            return new JsonResult(Ok(results));
        }

        [HttpPost]
        public JsonResult GetCityByProvince(GeoDetails geo)
        {
            var results = _context.geo_details.Where(a => a.country == geo.country && a.province == geo.province).Select(x => x.city).Distinct();
            return new JsonResult(Ok(results));
        }

        [HttpPost]
        public JsonResult GetPostalByCity(GeoDetails geo)
        {
            var results = _context.geo_details.Where(a => a.country == geo.country && a.province == geo.province && a.city == geo.city).Select(x => x.Postal_code).Distinct();
            return new JsonResult(Ok(results));
        }
    }


    
}
