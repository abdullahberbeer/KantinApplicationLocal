using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Models
{
    public class BasketItem
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product{ get; set; }
        public int BasketId { get; set; }
        public Basket Basket { get; set; }
        public int Adet{ get; set; }
        public double TotalPrice { get; set; } 
        
    }
}
