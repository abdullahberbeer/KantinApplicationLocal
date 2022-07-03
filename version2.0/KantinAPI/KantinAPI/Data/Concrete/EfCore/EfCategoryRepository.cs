using KantinAPI.Data.Abstract;
using KantinAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Data.Concrete.EfCore
{
    public class EfCategoryRepository:EfCoreGenericRepository<Category>,ICategoryRepository
    {
        public EfCategoryRepository(KantinContext context):base(context)
        {

        }

        private KantinContext KantinContext
        {
            get { return context as KantinContext; }
        }
       
        public async override Task<List<Category>> GetAll()
        {
            return await KantinContext.Categories.Include(x => x.Products).ToListAsync();
        }

        public async override Task<Category> GetById(int id)
        {
            return await KantinContext.Categories.Include(x => x.Products).FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<Category> DeleteCategory(int categoryId)
        {
            var category = KantinContext.Categories.FirstOrDefault(x => x.Id == categoryId);
            if (category!=null)
            {
                category.IsActive = false;
               await KantinContext.SaveChangesAsync();
                return category;
            }
            return null;
        }

        public bool ExistCategory(int categoryId)
        {
            var category = KantinContext.Categories.Any(x => x.Id == categoryId);
            if (category)
            {
                return true;
            }

            return false;
        }

    }
}
