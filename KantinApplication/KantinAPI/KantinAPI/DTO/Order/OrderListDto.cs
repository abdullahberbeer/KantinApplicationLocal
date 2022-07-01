using KantinAPI.DTO.User;
using KantinAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.DTO.Order
{
    public class OrderListDto
    {
        public int Id { get; set; }

        public int PersonId { get; set; }
        public double TotalPaye { get; set; }
        public DateTime OrderAdded { get; set; }
        public bool IsActive { get; set; } 
        public PersonListDto Person { get; set; }
        public List<OrderItem> OrderItems { get; set; }
    }
}
