using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KantinAPI.DTO.Category;


namespace KantinAPI.DTO.Product
{
    public class ProductListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Stock { get; set; }
        public int CategoryId { get; set; }
      
    }
}
