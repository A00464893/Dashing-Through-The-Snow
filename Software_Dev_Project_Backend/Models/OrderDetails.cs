namespace Backend.Models
{
    public class OrderDetails
    {
        public int Id { get; set; }
        public int Order_id { get; set; }
        public string? Product_id { get; set; }
        public int amount { get; set; }
        public int quantity { get; set; }




    }
}
