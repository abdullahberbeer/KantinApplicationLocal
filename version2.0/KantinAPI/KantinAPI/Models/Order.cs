using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        public double TotalPaye { get; set; }
        public int PersonId { get; set; }
        public bool IsActive { get; set; } = true;
        public Person Person { get; set; }
        public DateTime OrderAdded { get; set; } = DateTime.Now;
        public List<OrderItem> OrderItems{ get; set; }
    }
}
