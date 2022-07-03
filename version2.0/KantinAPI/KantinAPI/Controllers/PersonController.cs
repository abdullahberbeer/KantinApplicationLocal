using AutoMapper;
using KantinAPI.Business.Abstract;
using KantinAPI.DTO.User;
using KantinAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Controllers
{
    [Authorize]
 
    [ApiController]
    public class PersonController : Controller
    {
        private IPersonService _personService;
        private IBasketService _basketService;
        private IOrderService _orderService;
        private readonly IMapper _mapper;
        public PersonController(IPersonService personService, IBasketService basketService, IOrderService orderService, IMapper mapper)
        {
            _personService = personService;
            _basketService = basketService;
            _orderService = orderService;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAllPerson()
        {
            var persons = await _personService.GetAll();

            return Ok(_mapper.Map<List<PersonListDto>>(persons.Where(x => x.IsActive == true)));
        }
        [HttpGet]
        [Route("[controller]/{personId}")]
        public async Task<IActionResult> GetPerson(int personId)
        {
            var person = await _personService.GetById(personId);

            return Ok(_mapper.Map<PersonListDto>(person));
        }
        [HttpPost]
        [Route("[controller]/personAdd")]
        public async Task<IActionResult> AddPerson([FromBody] PersonAddDto model)
        {

            var person = await _personService.Create(_mapper.Map<Person>(model));
            if (person != null)
            {
                var basketentity = new Basket();
                basketentity.PersonId = person.Id;
                await _basketService.Create(basketentity);

                var orderentity = new Order();
                orderentity.PersonId = person.Id;
                await _orderService.Create(orderentity);

                return Ok(_mapper.Map<Person>(person));
            }
            return BadRequest(ModelState);
        }
        [HttpPost]
        [Route("[controller]/personUpdate/{personId}")]
        public async Task<IActionResult> UpdatePerson([FromRoute] int personId, [FromBody] PersonUpdateDto model)
        {


            var person = _personService.ExistPerson(personId);
            if (person)
            {
                var updatePerson = await _personService.Update(_mapper.Map<Person>(model));
                if (updatePerson != null)
                {
                    return Ok(_mapper.Map<Person>(updatePerson));
                }
                return NotFound();
            }
            return BadRequest(ModelState);
        }
        [HttpPost]
        [Route("[controller]/personDelete/{personId}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int personId)
        {


            var person = _personService.ExistPerson(personId);
            if (person)
            {
                var updatePerson = await _personService.DeletePerson(personId);
                if (updatePerson!=null)
                {
                    return Ok(_mapper.Map<Person>(updatePerson));
                }
                return NotFound();
            }
            return BadRequest(ModelState);
        }
        [HttpGet]
        [Route("[controller]/toplamBorc/{personId}")]
        public async Task<IActionResult> GetToplamBorc([FromRoute]int personId)
        {
            var borc = await _personService.ToplamBorc(personId);

            return Ok(borc);
        }
    }
}
