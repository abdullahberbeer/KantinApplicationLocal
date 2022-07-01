using KantinAPI.Business.Abstract;
using KantinAPI.Data.Abstract;
using KantinAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Business.Concrete
{
    public class ProductManager : IProductService
    {
        private IProductRepositroy _productRepositroy;
        public ProductManager(IProductRepositroy productRepositroy)
        {
            _productRepositroy = productRepositroy;
        }
        public async Task<Product> Create(Product entity)
        {
            await _productRepositroy.Create(entity);
            return entity;
        }

        public async Task<Product> Delete(Product entity)
        {
            await _productRepositroy.Delete(entity);
            return entity;
        }

        public async Task<Product> DeleteProduct(int productId)
        {
            return await _productRepositroy.DeleteProduct(productId);
        }

        public  bool ExistProduct(int productId)
        {
            return _productRepositroy.ExistProduct(productId);
        }

        public async Task<List<Product>> GetAll()
        {
            return await _productRepositroy.GetAll();
        }

        public async Task<List<Product>> GetByCategoryId(int categoryId)
        {
            return await _productRepositroy.GetByCategoryId(categoryId);
        }

        public async Task<Product> GetById(int id)
        {
            return await _productRepositroy.GetById(id);
        }

        public async Task<Product> Update(Product entity)
        {
            await _productRepositroy.Update(entity);
            return entity;
        }
    }
}
