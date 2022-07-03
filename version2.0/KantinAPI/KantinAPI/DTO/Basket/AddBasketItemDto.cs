using KantinAPI.DTO.Product;
using KantinAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.DTO.Basket
{
    public class AddBasketItemDto
    {
        public int PersonId { get; set; }
       
        public int ProductId { get; set; }
   
        public int Adet { get; set; }
        
       

    }

   
}
