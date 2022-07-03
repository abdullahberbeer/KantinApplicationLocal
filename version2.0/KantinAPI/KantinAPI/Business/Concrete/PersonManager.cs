using KantinAPI.Business.Abstract;
using KantinAPI.Data.Abstract;
using KantinAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Business.Concrete
{
    public class PersonManager : IPersonService
    {
        private IPersonRepository _personRepository;
        public PersonManager(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }

        public async Task<Person> Create(Person entity)
        {
            await _personRepository.Create(entity);
            return entity;
        }

        public async Task<Person> Delete(Person entity)
        {
            await _personRepository.Delete(entity);
            return entity;
        }

        public async Task<Person> DeletePerson(int personId)
        {
            return await _personRepository.DeletePerson(personId);
        }

        public bool ExistPerson(int personId)
        {
            return _personRepository.ExistPerson(personId);
        }

        public async Task<List<Person>> GetAll()
        {
            return await _personRepository.GetAll();
        }

        public async Task<Person> GetById(int id)
        {
            return await _personRepository.GetById(id);
        }

        public async Task<double> ToplamBorc(int personId)
        {
            return await _personRepository.ToplamBorc(personId);
        }

        public async Task<Person> Update(Person entity)
        {
            await _personRepository.Update(entity);
            return entity;
        }
    }
}
