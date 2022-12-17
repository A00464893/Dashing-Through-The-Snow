namespace Backend.Models
{
    public class PaymentDetails
    {
        public int Id { get; set; }
        public string? Transaction_id { get; set; }
        public String? Username { get; set; }
        public int amount { get; set; }
        public string? status { get; set; }
        public string? card_number { get; set; }
        public string? cvv { get; set; }
        public string? expiry { get; set; }
        public string? card_type { get; set; }
        public string? name_on_card { get; set; }

    }
}

