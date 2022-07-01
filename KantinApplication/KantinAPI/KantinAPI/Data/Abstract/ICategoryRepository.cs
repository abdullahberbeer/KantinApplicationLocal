using KantinAPI.Data.Concrete.EfCore;
using KantinAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Data.Abstract
{
  public  interface ICategoryRepository:IRepository<Category>
    {
        bool ExistCategory(int categoryId);
        Task<Category> DeleteCategory(int categoryId);
        
    }
}
