using KantinAPI.DTO.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.DTO.Category
{
    public class CategoryListDto
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<ProductListDto> Products { get; set; }
    }
}
