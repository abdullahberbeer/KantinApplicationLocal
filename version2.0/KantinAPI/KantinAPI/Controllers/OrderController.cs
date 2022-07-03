using AutoMapper;
using KantinAPI.Business.Abstract;
using KantinAPI.DTO.Order;
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
    public class OrderController : Controller
    {
        private IOrderService _orderService;
        private readonly IMapper _mapper;
        public OrderController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }
        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAllOrder()
        {
            var orders = await _orderService.GetAll();

            return Ok(_mapper.Map<List<OrderListDto>>(orders));
        }
        [HttpGet]
        [Route("[controller]/getOrdersPersonel/{personId}")]
        public async Task<IActionResult> GetOrdersPersonelId([FromRoute]int personId)
        {
            var orders = await _orderService.GetOrdersPersonelId(personId);

            return Ok(_mapper.Map<List<OrderListDto>>(orders));
        }
        
        [HttpPost]
        [Route("[controller]/orderAdd")]
        public async Task<IActionResult> AddOrder([FromBody] OrderAddDto model)
        {

            var order = await _orderService.Create(_mapper.Map<Order>(model));
            if (order != null)
            {
                return Ok(_mapper.Map<Order>(order));
            }
            return BadRequest(ModelState);
        }
        [HttpPost]
        [Route("[controller]/orderUpdate/{orderId}")]
        public async Task<IActionResult> UpdateOrder([FromRoute] int orderId, [FromBody] OrderUpdateDto model)
        {


            var order = _orderService.ExistOrder(orderId);
            var deletedorder = await _orderService.GetById(orderId);

            if (order)
            {
                var deleteOrder = await _orderService.Delete(deletedorder);
                if (deleteOrder != null)
                {
                    return Ok("Alışveriş silindi.");
                }
                return NotFound();
            }
            return BadRequest(ModelState);
        }
        [HttpPost]
        [Route("[controller]/orderDelete/{orderId}")]
        public async Task<IActionResult> DeleteOrder([FromRoute] int orderId)
        {


            var order = _orderService.ExistOrder(orderId);
            if (order)
            {
                var updateOrder = await _orderService.DeleteOrder(orderId);
                if (updateOrder!=null)
                {
                    return Ok(_mapper.Map<Order>(updateOrder));
                }
                return NotFound();
            }
            return BadRequest(ModelState);
        }
        [HttpPost]
        [Route("[controller]/orderAddItem")]
        public IActionResult AddOrderItem(int personId, int productId, int quantity)
        {
            _orderService.AddToOrder(personId, productId, quantity);
            return Ok("Ekleme başarılı");

        }
        [HttpPost]
        [Route("[controller]/clearOrder")]
        public IActionResult ClearOrder(int orderId)
        {
            _orderService.ClearOrder(orderId);
            return Ok("Silme başarılı");

        }
        [HttpPost]
        [Route("[controller]/deleteFromOrder")]
        public IActionResult DeleteFromOrder(int personId)
        {
            _orderService.DeleteFromOrder(personId);
            return Ok("Silme başarılı");

        }
    }
}
