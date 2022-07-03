using AutoMapper;
using KantinAPI.DTO.Basket;
using KantinAPI.DTO.Category;
using KantinAPI.DTO.Order;
using KantinAPI.DTO.Product;
using KantinAPI.DTO.User;
using KantinAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Helpers
{
    public class MapperProfiles:Profile
    {
        public MapperProfiles()
        {
            CreateMap<Category, CategoryListDto>().ReverseMap();
            CreateMap<Category, CategoryAddDto>().ReverseMap();
            CreateMap<Category, CategoryUpdateDto>().ReverseMap();
                     
            CreateMap<Product, ProductListDto>().ReverseMap();
            CreateMap<Product, ProductAddDto>().ReverseMap();
            CreateMap<Product, ProductUpdateDto>().ReverseMap();
           
            CreateMap<Basket, BasketListDto>().ReverseMap();
            CreateMap<Basket, BasketAddDto>().ReverseMap();
            CreateMap<Basket, BasketUpdateDto>().ReverseMap();
           
            CreateMap<Order,OrderListDto >().ReverseMap();
            CreateMap<Order,OrderAddDto >().ReverseMap();

            CreateMap<Person,PersonAddDto >().ReverseMap();
            CreateMap<Person, PersonListDto >().ReverseMap();
            CreateMap<Person, PersonUpdateDto >().ReverseMap();

          
        }
    }
}
