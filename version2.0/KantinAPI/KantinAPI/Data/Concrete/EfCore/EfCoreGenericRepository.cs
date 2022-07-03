using KantinAPI.Data.Abstract;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Data.Concrete.EfCore
{
    public class EfCoreGenericRepository<Tentity> : IRepository<Tentity> where Tentity:class 

    {
        protected readonly DbContext context;
        public EfCoreGenericRepository(DbContext ctx)
        {
            context = ctx;
        }
        public async Task<Tentity> Create(Tentity entity)
        {
            context.Set<Tentity>().Add(entity);
           await context.SaveChangesAsync();
            return entity;
        }

        public async Task<Tentity> Delete(Tentity entity)
        {
            context.Set<Tentity>().Remove(entity);
           await context.SaveChangesAsync();
            return entity;
        }

       
        public virtual async Task<List<Tentity>> GetAll()
        {
            return await context.Set<Tentity>().ToListAsync();
             
        }

        public virtual async Task<Tentity> GetById(int id)
        {
            return await context.Set<Tentity>().FindAsync(id);
        }

        public virtual async Task<Tentity> Update(Tentity entity)
        {
            context.Entry(entity).State = EntityState.Modified;
           await context.SaveChangesAsync();
            return entity;
        }
    }
}
