using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Models
{
    public class Person
    {
        public int Id { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }
        public double? Borc { get; set; }
        public bool IsActive { get; set; } = true;
        public string Description { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.Now;
        public List<Order> Orders { get; set; }
    }
}
