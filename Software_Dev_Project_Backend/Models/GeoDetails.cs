using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class GeoDetails
    {
        [Key]
        public String? Postal_code { get; set; }
        public String? city { get; set; }
        public string? province { get; set; }
        public string? country { get; set; }
      
    }
}
