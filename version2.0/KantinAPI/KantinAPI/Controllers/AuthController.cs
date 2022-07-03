using KantinAPI.Business.Abstract;
using KantinAPI.DTO.Auth;
using KantinAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace KantinAPI.Controllers
{
   
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private RoleManager<Role> _roleManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private IBasketService _basketService;
        private IOrderService _orderService;

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration, RoleManager<Role> roleManager, IBasketService basketService, IOrderService orderService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _roleManager = roleManager;
            _basketService = basketService;
            _orderService = orderService;
        }
        [Authorize]
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new User
            {
                UserName = model.UserName,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
               

                Role = model.Role



            };

            var result = await _userManager.CreateAsync(user, model.Password);
            await _userManager.AddToRoleAsync(user, model.Role);

           

            if (result.Succeeded)
            {
               
                return StatusCode(201);
            }
            return BadRequest("Kayıt olurken hata oluştu");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDTO model)
        {
            if (!ModelState.IsValid)
            {
                return
                 BadRequest(ModelState);
            }
            var user = await _userManager.FindByNameAsync(model.UserName);

            if (user == null)
            {
                return BadRequest("Böyle bir kullanıcı bulunamadı..");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, true);
            if (result.Succeeded)
            {
                return Ok(new
                {
                    token = GenerateTokenJwt(user),
                    role = user.Role
                });
            }
            return Unauthorized();
        }

        private string GenerateTokenJwt(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Secret").Value);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]{
                   new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                   new Claim(ClaimTypes.Name,user.UserName)
               }),
                Issuer = "akronsoft.online",
                Audience = "",
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);

        }
        [Authorize]
        [HttpPost("addrole")]
        public async Task<IActionResult> CreateRole(RoleDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Veri alınamadı");
            }
            var result = await _roleManager.CreateAsync(new Role()
            {
                Name = model.roleName
            });
            return Ok(result);
        }
    }
}
