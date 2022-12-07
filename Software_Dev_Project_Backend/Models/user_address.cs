using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace SaintMarysUniversity.Models
{
    public class user_address
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }
        public int user_ID { get; set; }
        public int mobile { get; set; }
        public string flat_no { get; set; }
        public string building_name { get; set; }
        public string street_address { get; set; }
        public string city { get; set; }
        public string postal_code { get; set; }
        public string country { get; set; }
        
    }
}