using AutoMapper;
using KantinAPI.Business.Abstract;
using KantinAPI.DTO.Basket;
using KantinAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Controllers
{

   

    [ApiController]
    public class BasketController : Controller
    {
        private IBasketService _basketService;
        private IOrderService _orderService;
        private IProductService _productService;
        private readonly IMapper _mapper;
        public BasketController(IBasketService basketService, IProductService productService, IMapper mapper, IOrderService orderService)
        {
            _basketService = basketService;
            _orderService = orderService;
            _productService = productService;
            _mapper = mapper;
        }
        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAllBasket()
        {
            var baskets = await _basketService.GetAll();

            return Ok(_mapper.Map<List<BasketListDto>>(baskets));
        }
        [HttpGet]
        [Route("[controller]/{basketId}")]
        public async Task<IActionResult> GetBasket(int basketId)
        {
            var basket = await _basketService.GetById(basketId);

            return Ok(_mapper.Map<BasketListDto>(basket));
        }
        [HttpPost]
        [Route("[controller]/basketAdd")]
        public async Task<IActionResult> AddBasket([FromBody] BasketAddDto model)
        {

            var basket = await _basketService.Create(_mapper.Map<Basket>(model));
            if (basket != null)
            {
                return Ok(_mapper.Map<Basket>(basket));
            }
            return BadRequest(ModelState);
        }
        [HttpPost]
        [Route("[controller]/basketUpdate/{basketId}")]
        public async Task<IActionResult> UpdateBasket([FromRoute] int basketId, [FromBody] BasketUpdateDto model)
        {


            var basket = _basketService.ExistBasket(basketId);
            var deletedbasket = await _basketService.GetById(basketId);

            if (basket)
            {
                var deleteBasket = await _basketService.Delete(deletedbasket);
                if (deleteBasket != null)
                {
                    return Ok("Sepet silindi.");
                }
                return NotFound();
            }
            return BadRequest(ModelState);
        }
        [HttpPost]
        [Route("[controller]/basketDelete/{basketId}")]
        public async Task<IActionResult> DeleteBasket([FromRoute] int basketId)
        {


            var basket = _basketService.ExistBasket(basketId);
            if (basket)
            {
                var updateBasket = await _basketService.DeleteBasket(basketId);
                if (updateBasket!=null)
                {
                    return Ok(_mapper.Map<Basket>(updateBasket));
                }
                return NotFound();
            }
            return BadRequest(ModelState);
        }


        [HttpPost]
        [Route("[controller]/basketDeleteOne")]
        public async Task<IActionResult> DeleteBasketOne(BasketDeleteOneDto model)
        {


            var basket = _basketService.ExistBasket(model.basketId);
            if (basket)
            {
                var updateBasket = await _basketService.DeleteBasketOne(model);
                if (updateBasket != null)
                {
                    return Ok(_mapper.Map<Basket>(updateBasket));
                }
                return NotFound();
            }
            return BadRequest(ModelState);
        }
        [HttpPost]
        [Route("[controller]/basketAddItem")]
        public async Task<IActionResult> AddBasketItem( AddBasketItemDto model)
        {
           

            

           await _basketService.AddToCart(model);
            return Ok("Ekleme başarılı");
          
        }
        [HttpPost]
        [Route("[controller]/clearCart")]
        public IActionResult ClearCart(int cartId)
        {
            _basketService.ClearCart(cartId);
            return Ok("Silme başarılı");

        }
        [HttpPost]
        [Route("[controller]/deleteFromCart")]
        public  IActionResult DeleteFromCart(int personId)
        {
            _basketService.DeleteFromCart(personId);
            return Ok("Silme başarılı");

        }
        [HttpPost]
        [Route("[controller]/checkout")]
        public IActionResult Checkout([FromBody] int personId)
        {
            var basket = _basketService.GetByPersonId(personId);

            var modell = new Basket()
            {
                Id = basket.Result.Id,
                BasketItems = basket.Result.BasketItems.Select(i => new BasketItem()
                {
                    Id = i.Id,
                    ProductId = i.ProductId,
                    Adet = i.Adet,
                    TotalPrice = i.TotalPrice


                }).ToList()
            };



            var ordermodel = new Order
            {
                PersonId = personId,
                TotalPaye = (double)modell.BasketItems.Sum(x => x.TotalPrice)

            };


            ordermodel.OrderItems = new List<OrderItem>();


            foreach (var item in modell.BasketItems)
            {
                var orderItem = new OrderItem()
                {
                    Price = item.TotalPrice,
                    Quantity = item.Adet,
                    ProductId = item.ProductId,
                    PersonId = personId
                };

                ordermodel.OrderItems.Add(orderItem);

                var product = _productService.GetById(orderItem.ProductId);




                product.Result.Stock -= orderItem.Quantity;

                if (product.Result.Stock >= 1)
                {
                    _productService.Update(product.Result);



                    _orderService.Update(ordermodel);
                    _basketService.DeleteBasket(modell.Id);


                    /*_basketService.DeleteFromCart(userId);*/
                    return Ok(" başarılı");

                }
                else
                {
                    return NotFound("Stok bitti");



                }


            }

            return BadRequest("Bilinmeyen hata yöneticinize başvurun..");









        }
    }
}
