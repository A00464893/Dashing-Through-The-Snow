using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace SaintMarysUniversity.Models
{
    public class product_category.cs
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }
        public string name { get; set; }
        public string desc{ get; set; } 
    }
}