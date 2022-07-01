using KantinAPI.Business.Abstract;
using KantinAPI.Data.Abstract;
using KantinAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Business.Concrete
{
    public class CategoryManager : ICategoryService
    {
        private ICategoryRepository _categoryRepository;
        public CategoryManager(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        public async Task<Category> Create(Category entity)
        {
           await _categoryRepository.Create(entity);
            return entity;
        }

        public async Task<Category> Delete(Category entity)
        {
           await _categoryRepository.Delete(entity);
            return entity;
        }

        public async Task<Category> DeleteCategory(int categoryId)
        {
            return await _categoryRepository.DeleteCategory(categoryId);
        }

        public bool ExistCategory(int categoryId)
        {
            return _categoryRepository.ExistCategory(categoryId);
        }

        public async  Task<List<Category>> GetAll()
        {
            return await _categoryRepository.GetAll();
        }

        public async Task<Category> GetById(int id)
        {
            return await _categoryRepository.GetById(id);
        }

        public async Task<Category> Update(Category entity)
        {
           await _categoryRepository.Update(entity);
            return entity;
        }
    }
}
