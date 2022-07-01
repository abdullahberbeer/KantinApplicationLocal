using KantinAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Business.Abstract
{
   public interface IProductService
    {
        Task<List<Product>> GetAll();
        Task<Product> GetById(int id);
        Task<Product> Create(Product entity);
        Task<Product> Update(Product entity);
        Task<Product> Delete(Product entity);
        bool ExistProduct(int productId);
        Task<Product> DeleteProduct(int productId);
        Task<List<Product>> GetByCategoryId(int categoryId);
    }
}
