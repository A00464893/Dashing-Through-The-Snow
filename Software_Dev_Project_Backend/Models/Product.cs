namespace Backend.Models
{
    public class Product
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Desc { get; set; }
        public string? image { get; set; }
        public string? category_id { get; set; }
        public int quantity { get; set; }
        public int price { get; set; }

    }
}
