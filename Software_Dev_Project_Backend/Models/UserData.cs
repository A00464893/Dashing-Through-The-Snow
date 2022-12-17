using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class UserData
    {
        [Key]
        public string? Username { get; set; }
        public string? First_name { get; set; }
        public string? Last_name { get; set; }  
        public string? password { get; set; }
        public string? email { get; set; }
        public Int64 mobile { get; set; }

    }
}
