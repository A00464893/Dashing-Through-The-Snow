using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace SaintMarysUniversity.Models
{
    public class orders.cs
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }
        public int user_ID { get; set; }
        public int total { get; set; }
        public int payment_id { get; set; }
    }
}