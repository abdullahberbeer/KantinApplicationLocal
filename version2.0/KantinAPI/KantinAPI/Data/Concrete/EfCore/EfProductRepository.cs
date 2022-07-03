using KantinAPI.Data.Abstract;
using KantinAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Data.Concrete.EfCore
{
    public class EfProductRepository : EfCoreGenericRepository<Product>, IProductRepositroy
    {
        public EfProductRepository(KantinContext context) : base(context)
        {

        }

        private KantinContext KantinContext
        {
            get { return context as KantinContext; }
        }

        //public async override Task<List<Product>> GetAll()
        //{
        //    return await KantinContext.Products.Include(x=>x.Category).ToListAsync();
        //}

        //public async override Task<Product> GetById(int id)
        //{
        //    return await KantinContext.Products.Include(x => x.Category).FirstOrDefaultAsync(x=>x.Id==id);
        //}
        public async Task<Product> DeleteProduct(int productId)
        {
            var product = KantinContext.Products.FirstOrDefault(x => x.Id == productId);
            if (product != null)
            {
                product.IsActive = false;
                await KantinContext.SaveChangesAsync();
                return product;
            }
            else
            {
                return null;
            }
        }

        public bool ExistProduct(int productId)
        {
            var product = KantinContext.Products.Any(x => x.Id == productId);
            if (product)
            {
                return true;
            }

            return false;
        }

        public async Task<List<Product>> GetByCategoryId(int categoryId)
        {
            var products = await KantinContext.Products.Where(x => x.CategoryId == categoryId && x.IsActive==true).Include(x => x.Category).ToListAsync();
            if (products!=null)
            {
                return products;

            }
            return null;
        }
    }
}
