using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace SaintMarysUniversity.Models
{
    public class product.cs
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }
        public string name { get; set; }
        public string desc{ get; set; }
        public string image { get; set; }
        public int category_id { get; set; }
        public int quantity { get; set; }
        public int price { get; set; }
        
    }
}