using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace SaintMarysUniversity.Models
{
    public class payment_details.cs
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }
        public int order_ID { get; set; }
        public string transaction_id { get; set; }
        public int user_ID { get; set; }
        public string payment_type{ get; set; } 
        public int amount { get; set; }
        public boolean statue{get;set;}
    }
}