using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class UserAddress
    {
        public int id { get; set; }
        public string? username { get; set; }
        public string? name { get; set; }
        public Int64 mobile { get; set; }
        public string? flat_no { get; set; }
        public string? province { get; set; }
        public string? street_address { get; set; }
        public string? city { get; set; }
        public string? postal_code { get; set; }
        public string? country { get; set; }


    }
}
