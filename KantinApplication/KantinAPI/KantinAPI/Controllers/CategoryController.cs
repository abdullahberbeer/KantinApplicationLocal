using AutoMapper;
using KantinAPI.Business.Abstract;
using KantinAPI.DTO.Category;
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
    public class CategoryController : Controller
    {
        private ICategoryService _categoryService;
        private readonly IMapper _mapper;
        public CategoryController(ICategoryService categoryService, IMapper mapper)
        {
            _categoryService = categoryService;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAllCategory()
        {
            var categories = await _categoryService.GetAll();
            
            return Ok(_mapper.Map<List<CategoryListDto>>(categories.Where(x=>x.IsActive==true)));
        }
        [HttpGet]
        [Route("[controller]/{categoryId}")]
        public async Task<IActionResult> GetCategory(int categoryId)
        {
            var category =await _categoryService.GetById(categoryId);

            return Ok(_mapper.Map<CategoryListDto>(category));
        }
        [HttpPost]
        [Route("[controller]/categoryAdd")]
        public async Task<IActionResult> AddCategory([FromBody]CategoryAddDto model)
        {

            var category = await _categoryService.Create(_mapper.Map<Category>(model));
            if (category != null)
            {
                return Ok(_mapper.Map<Category>(category));
            }
            return BadRequest(ModelState);
        }

        [HttpPost]
        [EnableCors("myclients")]
        [Route("[controller]/categoryUpdate/{categoryId}")]
        public async Task<IActionResult> UpdateCategory([FromRoute] int categoryId,[FromBody] CategoryUpdateDto model)
        {


            var category =  _categoryService.ExistCategory(categoryId);
            if (category)
            {
                var updateCategory = await _categoryService.Update(_mapper.Map<Category>(model));
                if(updateCategory!=null)
                {
                    return Ok(_mapper.Map<Category>(updateCategory));
                }
                return NotFound();
            }
            return BadRequest(ModelState);
        }
      [HttpPost]
        [Route("[controller]/categoryDelete/{categoryId}")]
        public async Task<IActionResult> DeleteCategory([FromRoute] int categoryId)
        {


            var category = _categoryService.ExistCategory(categoryId);
            if (category)
            {
                var updateCategory = await _categoryService.DeleteCategory(categoryId);
                if (updateCategory!=null)
                {    
                    return Ok(_mapper.Map<Category>(updateCategory));
                }
                return NotFound();
            }
            return BadRequest(ModelState);
        }
    }
}
