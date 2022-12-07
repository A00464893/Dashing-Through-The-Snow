using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace SaintMarysUniversity.Models
{
    public class cart_item.cs
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }
        public int user_ID { get; set; }
        public string session_ID { get; set; }
        public int quantity { get; set; }
        public int product_id { get; set; }
    }
}