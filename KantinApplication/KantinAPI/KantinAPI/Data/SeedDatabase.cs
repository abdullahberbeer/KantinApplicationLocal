using KantinAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Data
{
    public static class SeedDatabase
    {   
        public static async Task Seed(UserManager<User> userManager,IConfiguration configuration)
        {
           

            if (!userManager.Users.Any())
            {
                var users = File.ReadAllText("Data/users.json");
                var listOfUsers = JsonConvert.DeserializeObject<List<User>> (users);
                foreach (var user in listOfUsers)
                {
                    await userManager.CreateAsync(user, configuration.GetSection("AppSettings:Version").Value);
                }
            }
        }
    }
}
