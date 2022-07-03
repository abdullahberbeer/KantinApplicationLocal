
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Models
{
    public class User:IdentityUser<int>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }
        public double?  Borc { get; set; }
        public string Role { get; set; }
    }
}
