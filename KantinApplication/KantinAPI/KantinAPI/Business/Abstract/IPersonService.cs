using KantinAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Business.Abstract
{
   public interface IPersonService
    {
        Task<List<Person>> GetAll();
        Task<Person> GetById(int id);
        Task<Person> Create(Person entity);
        Task<Person> Update(Person entity);
        Task<Person> Delete(Person entity);
        bool ExistPerson(int personId);
        Task<Person> DeletePerson(int personId);
        Task<double> ToplamBorc(int personId);
    }
}
