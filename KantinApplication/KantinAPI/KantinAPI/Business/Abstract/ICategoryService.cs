using KantinAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Business.Abstract
{
  public  interface ICategoryService
    {
        Task<List<Category>> GetAll();
        Task<Category> GetById(int id);
        Task<Category> Create(Category entity);
        Task<Category> Update(Category entity);
        Task<Category> Delete(Category entity);
        bool ExistCategory(int categoryId);
        Task<Category> DeleteCategory(int categoryId);
    }
}
