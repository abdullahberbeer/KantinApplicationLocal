using KantinAPI.DTO.User;
using KantinAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.DTO.Basket
{
    public class BasketListDto
    {
        public int Id { get; set; }

        public double TotalPaye { get; set; }
        public int PersonId { get; set; }
        public PersonListDto Person { get; set; }
        public List<BasketItem> BasketItems { get; set; }
    }
}
