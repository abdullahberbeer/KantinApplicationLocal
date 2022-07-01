using KantinAPI.Data.Abstract;
using KantinAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Data.Concrete.EfCore
{
    public class EfPersonRepository:EfCoreGenericRepository<Person>,IPersonRepository
    {
        public EfPersonRepository(KantinContext context) : base(context)
        {

        }

        private KantinContext KantinContext
        {
            get { return context as KantinContext; }
        }

      

        public async Task<Person> DeletePerson(int personId)
        {
            var person = KantinContext.Persons.FirstOrDefault(x => x.Id == personId);
            if (person != null)
            {
                person.IsActive = false;
                await KantinContext.SaveChangesAsync();
                return person;
            }
            else
            {
                return null;
            }
        }

        public bool ExistPerson(int personId)
        {
            var person = KantinContext.Persons.Any(x => x.Id == personId);
            if (person)
            {
                return true;
            }

            return false;
        }

        public async Task<double> ToplamBorc(int personId)
        {
            var person =await KantinContext.Persons.Include(x=>x.Orders).FirstOrDefaultAsync(x => x.Id == personId);

            var toplam = (double)person.Orders.Where(x=>x.IsActive==true).Sum(x => x.TotalPaye);
            return toplam;
        }
    }
}
