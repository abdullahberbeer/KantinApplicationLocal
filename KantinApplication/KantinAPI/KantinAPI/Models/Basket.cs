using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Models
{
    public class Basket
    {
        public int Id { get; set; }

        public double TotalPaye { get; set; }
        public int PersonId { get; set; }
        public Person Person { get; set; }
        public List<BasketItem> BasketItems{ get; set; }
    }
}
