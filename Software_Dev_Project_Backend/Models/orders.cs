using System.Collections.Generic;

namespace Backend.Models
{
    public class Orders
    {
        public int Id { get; set; }
        public String? Username { get; set; }
        public int Total { get; set; }
        public int Payment_id { get; set; }
        public String? order_date { get; set; }
       

    }
}
